export interface ProductFormData {
  // LEGAL & REGULATORY

  fssaiLicense: string;
  commonName: string;
  ingredients: string;
  netWeight: number;

  mfgDate: string;
  expiryDate: string;
  bestBefore: string;
  batchNo: string;

  mrp: string;

  manufacturerName: string;
  manufacturerAddress: string;

  countryOfOrigin: string;
  vegNonVeg: "VEG" | "NON_VEG";

  customerCarePhone: string;
  customerCareEmail: string;

  storageInstructions: string;
  allergenInfo: string;

  //PRODUCT MASTER DATA

  code: string;
  barcode: string;

  name: string;
  category: string;
  brand: string;

  botanicalName: string;
  grade: string;
  form:
    | "POWDER"
    | "WHOLE"
    | "CRUSHED"
    | "GRANULES"
    | "PASTE"
    | "LIQUID"
    | "OTHER";

  type:
    | "FINISHED_GOOD"
    | "RAW_MATERIAL"
    | "PACKAGING_MATERIAL"
    | "SEMI_FINISHED_GOOD";

  hsn: string;
  unit: string;

  // MANUFACTURING & BATCH DETAILS

  rawMaterialSource: string;
  productionDate: string;
  plantId: string;

  moistureContent: string;
  purityTest: string;
  adulterationTest: string;

  processingMethod: string;
  pesticideTestRef: string;

  //PACKAGING & INVENTORY

  packagingType: string;
  packSize: number;
  shelfLife: string;

  warehouseLocation: string;
  currentStock: string;
  reorderLevel: string;

  //  COMMERCIAL FIELDS

  distributorPrice: string;
  retailerPrice: string;
  dealerPrice: string;

  purchaseCost: string;
  manufacturingCost: string;

  gst: string;
  discountScheme: string;

  //  CERTIFICATIONS & COMPLIANCE

  certifications: string;
  exportCertNumber: string;
}

export interface ProductType {
  barcode: string;
  batchNo: string;
  brand: string;
  category: string;
  code: string;
  distPrice: string;
  gst: string | number;
  hsn: string;
  id: string;
  mrp: string | number;
  netWeight: string;
  productName: string;
  stock: number;
  unit: string;
}
