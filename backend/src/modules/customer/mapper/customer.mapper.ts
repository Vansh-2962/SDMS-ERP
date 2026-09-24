import type { Customer, Prisma } from "@/generated/prisma/client.js";
import type { CreateCustomerDto } from "../dto/customer.dto.js";
import type { CustomerWithSalesman } from "../customer.types.js";

export class CustomerMapper {
  static toPersistence(
    data: CreateCustomerDto["body"],
  ): Prisma.CustomerCreateInput {
    return {
      shopName: data.shopName,
      ownerName: data.ownerName,
      type: data.type,
      mobile: data.mobile,

      ...(data.gstNumber !== undefined && {
        gstNumber: data.gstNumber,
      }),

      ...(data.pan !== undefined && {
        pan: data.pan,
      }),

      ...(data.fssai !== undefined && {
        fssai: data.fssai,
      }),

      status: data.status ?? "ACTIVE",

      ...(data.whatsapp !== undefined && {
        whatsapp: data.whatsapp,
      }),

      ...(data.email !== undefined && {
        email: data.email,
      }),

      ...(data.street !== undefined && {
        street: data.street,
      }),

      ...(data.state !== undefined && {
        state: data.state,
      }),

      ...(data.stateCode !== undefined && {
        stateCode: data.stateCode,
      }),

      ...(data.district !== undefined && {
        district: data.district,
      }),

      ...(data.pincode !== undefined && {
        pincode: data.pincode,
      }),

      ...(data.latitude !== undefined && {
        latitude: data.latitude,
      }),

      ...(data.longitude !== undefined && {
        longitude: data.longitude,
      }),

      ...(data.salesTerritory !== undefined && {
        salesTerritory: data.salesTerritory,
      }),

      ...(data.assignedSalesmanId !== undefined && {
        assignedSalesman: {
          connect: {
            id: data.assignedSalesmanId,
          },
        },
      }),

      ...(data.creditLimit !== undefined && {
        creditLimit: data.creditLimit,
      }),

      ...(data.paymentTerms !== undefined && {
        paymentTerms: data.paymentTerms,
      }),

      ...(data.openingBal !== undefined && {
        openingBal: data.openingBal,
      }),
    };
  }

  static toResponse(data: Customer) {
    return {
      id: data.id,
      createdAt: data.createdAt,
    };
  }

  static toList(data: CustomerWithSalesman[]) {
    return data.map((d: CustomerWithSalesman) => {
      return {
        id: d.id,
        customerCode: d.customerCode,
        shopName: d.shopName,
        ownerName: d.ownerName,
        type: d.type,
        salesman: d.assignedSalesman?.fullName,
        mobile: d.mobile,
        creditLimit: d.creditLimit,
        district: d.district,
        state: d.state,
        pincode: d.pincode,
        paymentTerms: d.paymentTerms,
        gstNumber: d.gstNumber,
        status: d.status,
        createdAt: d.createdAt,
      };
    });
  }
}
