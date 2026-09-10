import type {
  Inventory,
  Product,
  ProductBatch,
  ProductPrice,
} from "@/generated/prisma/client.js";
import type { ProductWithRelations } from "../product.types.js";

type ProductResponse = {
  id: string;
  code: string;
  barcode: string | null;
  productName: string;
  unit: string;
  netWeight: Product["netWeight"];
  category: string;
  brand: string | null;
  hsn: string | null;
  gst: ProductPrice["gst"];
  mrp: ProductPrice["mrp"];
  distPrice: ProductPrice["distributorPrice"];
  stock: number;
  batchNo: ProductBatch["batchNo"];
};

export class ProductMapper {
  static toRespoonse(data: Product) {
    return {
      id: data.id,
      createdAt: data.createdAt,
    };
  }

  static allProductsResponse(data: ProductWithRelations[]): ProductResponse[] {
    return data.map((product) => {
      const price = product.prices[0];
      const batch = product.batches[0];
      const inventory = product.inventories[0];

      return {
        id: product.id,
        code: product.code,
        barcode: product.barcode,
        productName: product.name,
        unit: product.unit,
        netWeight: product.netWeight,
        category: product.category,
        brand: product.brand,
        hsn: product.hsn,

        gst: price?.gst ?? null,
        mrp: price?.mrp ?? null,
        distPrice: price?.distributorPrice ?? null,

        stock: inventory?.currentStock?.toNumber() ?? 0,
        batchNo: batch?.batchNo as string,
      };
    });
  }

  static deleteResponse(product: Product): string {
    return product.id;
  }
}
