import type { CustomerStatus, CustomerType } from "@/generated/prisma/enums.js";

export interface CreateCustomerDto {
  body: {
    shopName: string;
    ownerName: string;
    type: CustomerType;
    mobile: string;

    gstNumber?: string;
    pan?: string;
    fssai?: string;
    status?: CustomerStatus;
    whatsapp?: string;
    email?: string;

    street?: string;
    state?: string;
    stateCode?: string;
    district?: string;
    pincode?: string;

    latitude?: string;
    longitude?: string;

    salesTerritory?: string;
    assignedSalesmanId?: string;

    creditLimit?: number;
    paymentTerms?: number;
    openingBal?: number;
  };
}
