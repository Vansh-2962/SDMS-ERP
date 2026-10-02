import {
  Prisma,
  type Invoice,
  type InvoiceLabel,
  type PrismaClient,
} from "@/generated/prisma/client.js";
import type { CreateInvoiceDTO } from "./invoice.dto.js";
import type { InvoiceRepository } from "./invoice.repository.js";
import type { InventoryService } from "../product/inventory/inventory.service.js";
import type { CustomerService } from "../customer/customer.service.js";
import { NotFoundError } from "@/shared/errors/not-found.error.js";
import { ProductService } from "../product/product.service.js";
import { InvoiceMapper } from "./mappers/invoice.mapper.js";
import { logger } from "@/config/logger/index.js";

export class InvoiceService {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly prisma: PrismaClient,
    private readonly inventoryService: InventoryService,
    private readonly customerService: CustomerService,
    private readonly productService: ProductService,
  ) {}

  private generateInvoiceNo(prefix: string, sequence: number) {
    return `${prefix}/${sequence.toString().padStart(6, "0")}`;
  }

  private getShortPrefix(key: InvoiceLabel) {
    if (key === "TAX_INVOICE") {
      return `INV`;
    } else if (key === "PROFORMA_INVOICE") {
      return `PRF`;
    } else if (key === "DELIVERY_CHALLAN") {
      return `DC`;
    } else if (key === "DEBIT_NOTE") {
      return `DB`;
    } else if (key === "CREDIT_NOTE") {
      return `CN`;
    } else {
      return `INV`;
    }
  }

  async create(data: CreateInvoiceDTO): Promise<Invoice | null> {
    return await this.prisma.$transaction(
      async (tx) => {
        // check for some basic validation
        if (!data.items || data.items.length === 0) {
          throw new Error("Invoice must contain at least one item");
        }

        const productIds = data.items.map((item) => item.productId);
        const uniqueProductIds = new Set(productIds);

        if (uniqueProductIds.size !== productIds.length) {
          throw new Error(
            "Duplicate items are not allowed in the same invoice",
          );
        }

        // customer validation
        const customer = await this.customerService.getById(
          data.customerId,
          this.prisma,
        );
        if (!customer) {
          throw new NotFoundError("Customer");
        }

        // product validation
        const products = await this.productService.getAllInInvoice(productIds);
        if (products.length !== productIds.length) {
          const foundProductIds = new Set(
            products.map((product) => product.id),
          );
          const missingProducts = productIds.filter(
            (productId) => !foundProductIds.has(productId),
          );
          throw new Error(
            `Product(s) not found: ${missingProducts.join(", ")}`,
          );
        }

        // quantity validation
        for (const item of data.items) {
          const qty = new Prisma.Decimal(item.qty);
          if (qty.lessThanOrEqualTo(0)) {
            throw new Error(`Invalid qty for product ${item.productId}`);
          }

          const rate = new Prisma.Decimal(item.rate);
          if (rate.lessThanOrEqualTo(0)) {
            throw new Error(`Invalid rate for product ${item.productId}`);
          }

          const discPer = new Prisma.Decimal(item.discPer);
          if (discPer.lessThan(0) || discPer.greaterThan(100)) {
            throw new Error(
              `Invalid discount percentage for product ${item.productId}`,
            );
          }

          const gstPer = new Prisma.Decimal(item.gstPer);
          if (gstPer.lessThan(0) || gstPer.greaterThan(100)) {
            throw new Error(
              `Invalid GST percentage for product ${item.productId}`,
            );
          }
        }

        // generating unique sequence number and invoice number
        const sequence = await this.invoiceRepository.updateSequence(
          data.label,
          this.prisma,
        );

        const prefix = this.getShortPrefix(data.label);
        const invoiceNumber = this.generateInvoiceNo(prefix, sequence.current);

        // validation stock for each item
        const stocksForSoldProducts =
          await this.inventoryService.getStockForProductIds(productIds, tx);

        if (!stocksForSoldProducts || stocksForSoldProducts?.length === 0) {
          throw new Error(`Failed to fetch stocks for the products`);
        }

        let invoice: Invoice | null = null;
        for (const item of data.items) {
          const stock = stocksForSoldProducts
            .filter((inventory) => inventory.productId === item.productId)
            .reduce(
              (total, inventory) => total.add(inventory.currentStock),
              new Prisma.Decimal(0),
            );

          const requestedQty = new Prisma.Decimal(item.qty);

          if (stock.lessThan(requestedQty)) {
            const product = products.find((p) => p.id === item.productId);
            throw new Error(`Insufficient stock for ${product?.name}.
              Available: ${stock.toString()}
              Requested: ${requestedQty.toString()}
              `);
          }

          // create invoice
          const payload = InvoiceMapper.toRequestPayload(
            data,
            sequence.id,
            invoiceNumber,
          );

          invoice = await this.invoiceRepository.create(payload, tx);

          // decrement stock
          for (const item of data.items) {
            let remainingQty = new Prisma.Decimal(item.qty);
            const productStocks = stocksForSoldProducts.filter(
              (inventory) => inventory.productId === item.productId,
            );

            for (const stock of productStocks) {
              if (remainingQty.lessThanOrEqualTo(0)) {
                break;
              }

              const decrementQty = Prisma.Decimal.min(
                remainingQty,
                stock.currentStock,
              );

              const updatedCount = await this.inventoryService.decrementStock(
                stock.id,
                decrementQty,
                tx,
              );

              if (updatedCount !== 1) {
                throw new Error(
                  `Stock changed while processing product ${item.productId}. Please retry the invoice.`,
                );
              }

              remainingQty = remainingQty.sub(decrementQty);
            }

            if (remainingQty.greaterThan(0)) {
              throw new Error(
                `Unable to deduct complete stock for product ${item.productId}`,
              );
            }
          }
        }
        return invoice;
      },
      {
        maxWait: 5000,
        timeout: 10000,
      },
    );
  }

  async getAllInvoices(): Promise<Invoice[]> {
    const invoices = await this.invoiceRepository.getAllInvoices();
    return invoices;
  }

  async getInvoiceById(id: string): Promise<Invoice | null> {
    const invoice = await this.invoiceRepository.getInvoiceById(id);
    if (!invoice) {
      throw new NotFoundError("Invoice");
    }
    return invoice;
  }
}
