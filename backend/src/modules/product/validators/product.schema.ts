import { z } from "zod";

const productTypeSchema = z.enum([
  "FINISHED_GOOD",
  "RAW_MATERIAL",
  "PACKAGING_MATERIAL",
  "SEMI_FINISHED_GOOD",
]);

const productFormSchema = z.enum([
  "POWDER",
  "WHOLE",
  "CRUSHED",
  "GRANULES",
  "PASTE",
  "LIQUID",
  "OTHER",
]);

const vegNonVegSchema = z.enum(["VEG", "NON_VEG"]);

const optionalPositiveNumber = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.coerce.number().positive().optional(),
);

const optionalNonNegativeNumber = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.coerce.number().nonnegative().optional(),
);

const optionalString = (max = 255) => z.string().trim().max(max).optional();

const optionalDate = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.coerce.date().optional(),
);

export const createProductSchema = z.object({
  body: z.object({
    code: z.string().trim().min(2).max(50),
    barcode: optionalString(100),
    name: z.string().trim().min(2).max(150),
    commonName: optionalString(150),
    botanicalName: optionalString(150),
    brand: optionalString(100),
    category: z.string().trim().min(2).max(100),
    type: productTypeSchema.optional(),
    grade: optionalString(100),
    form: productFormSchema.optional(),
    hsn: optionalString(20),
    unit: z.string().trim().min(1).max(20),

    fssaiLicense: optionalString(100),
    ingredients: optionalString(5000),
    allergenInfo: optionalString(2000),
    storageInstructions: optionalString(2000),
    vegNonVeg: vegNonVegSchema.optional(),
    countryOfOrigin: optionalString(100),
    customerCarePhone: optionalString(30),
    customerCareEmail: z
      .string()
      .trim()
      .email()
      .max(255)
      .optional()
      .or(z.literal("")),

    manufacturerName: optionalString(200),
    manufacturerAddress: optionalString(500),
    rawMaterialSource: optionalString(200),
    productionDate: optionalDate,
    mfgDate: optionalDate,
    expiryDate: optionalDate,
    bestBefore: optionalString(100),
    batchNo: optionalString(100),
    plantId: optionalString(100),

    moistureContent: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.coerce.number().min(0).max(100).optional(),
    ),
    purityTest: optionalString(),
    adulterationTest: optionalString(),
    processingMethod: optionalString(200),
    pesticideTestRef: optionalString(),

    packagingType: optionalString(100),
    packSize: optionalString(100),
    netWeight: optionalString(100),
    shelfLife: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.coerce.number().int().positive().optional(),
    ),

    warehouseLocation: optionalString(100),
    currentStock: optionalNonNegativeNumber,
    reorderLevel: optionalNonNegativeNumber,

    mrp: optionalPositiveNumber,
    distributorPrice: optionalPositiveNumber,
    retailerPrice: optionalPositiveNumber,
    dealerPrice: optionalPositiveNumber,
    purchaseCost: optionalPositiveNumber,
    manufacturingCost: optionalPositiveNumber,

    gst: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.coerce.number().min(0).max(100).optional(),
    ),
    discountScheme: optionalString(500),

    certifications: optionalString(1000),
    exportCertNumber: optionalString(100),
  }),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const deleteProductSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Id is required"),
  }),
});

export type DeleteProductInput = z.infer<typeof deleteProductSchema>;
