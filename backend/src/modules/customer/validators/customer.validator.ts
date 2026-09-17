import { custom, z } from "zod";

const optionalField = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((value) => {
    if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "")
    ) {
      return undefined;
    }

    return value;
  }, schema.optional());

export const customerSchema = z.object({
  body: z.object({
    shopName: z
      .string()
      .trim()
      .min(2, "Shop name must be at least 2 characters")
      .max(250, "Shop name cannot exceed 250 characters"),

    ownerName: z
      .string()
      .trim()
      .min(2, "Owner name must be at least 2 characters")
      .max(100, "Owner name cannot exceed 100 characters"),

    type: z.enum(
      [
        "DISTRIBUTOR",
        "SUPER_STOCKIST",
        "RETAILER",
        "WHOLESALER",
        "MODERN_TRADE",
      ],
      {
        message: "Customer type is required",
      },
    ),

    mobile: z
      .string()
      .trim()
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),

    // Optional fields
    gstNumber: optionalField(
      z
        .string()
        .trim()
        .regex(/^[0-9A-Z]{15}$/, "Enter a valid 15-character GST number"),
    ),

    pan: optionalField(
      z
        .string()
        .trim()
        .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Enter a valid PAN number"),
    ),

    fssai: optionalField(
      z
        .string()
        .trim()
        .regex(/^\d{14}$/, "FSSAI number must contain 14 digits"),
    ),

    status: optionalField(z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE")),

    whatsapp: optionalField(
      z
        .string()
        .trim()
        .regex(/^[6-9]\d{9}$/, "Enter a valid WhatsApp number"),
    ),

    email: optionalField(z.email("Enter a valid email address")),

    street: optionalField(
      z.string().trim().max(250, "Street cannot exceed 250 characters"),
    ),

    state: optionalField(
      z.string().trim().max(100, "State cannot exceed 100 characters"),
    ),

    stateCode: optionalField(
      z
        .string()
        .trim()
        .regex(/^\d{1,2}$/, "State code must contain 1 or 2 digits"),
    ),

    district: optionalField(
      z.string().trim().max(100, "District cannot exceed 100 characters"),
    ),

    pincode: optionalField(
      z
        .string()
        .trim()
        .regex(/^\d{6}$/, "Pincode must contain 6 digits"),
    ),

    latitude: optionalField(
      z
        .string()
        .trim()
        .refine((value) => {
          const latitude = Number(value);
          return Number.isFinite(latitude) && latitude >= -90 && latitude <= 90;
        }, "Latitude must be between -90 and 90"),
    ),

    longitude: optionalField(
      z
        .string()
        .trim()
        .refine((value) => {
          const longitude = Number(value);
          return (
            Number.isFinite(longitude) && longitude >= -180 && longitude <= 180
          );
        }, "Longitude must be between -180 and 180"),
    ),

    salesTerritory: optionalField(
      z
        .string()
        .trim()
        .max(150, "Sales territory cannot exceed 150 characters"),
    ),

    assignedSalesmanId: optionalField(z.uuid()),

    creditLimit: optionalField(
      z.coerce
        .number()
        .finite("Credit limit must be a valid number")
        .min(0, "Credit limit cannot be negative")
        .default(0),
    ),

    paymentTerms: optionalField(
      z.coerce
        .number()
        .int("Payment terms must be a whole number")
        .min(0, "Payment terms cannot be negative"),
    ),

    openingBal: optionalField(
      z.coerce
        .number()
        .finite("Opening balance must be a valid number")
        .default(0),
    ),
  }),
});

export const deleteCustomerSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Id is required"),
  }),
});

export const getCustomerByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Id is required"),
  }),
});

export type GetCustomerByIdInput = z.infer<typeof deleteCustomerSchema>;
export type DeleteCustomerInput = z.infer<typeof deleteCustomerSchema>;
export type CreateCustomerInput = z.infer<typeof customerSchema>;
