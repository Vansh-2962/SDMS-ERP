import type {
  Inventory,
  Product,
  ProductBatch,
  ProductPrice,
} from "@/generated/prisma/client.js";
import type {
  ProductDetailsWithRelations,
  ProductWithRelations,
} from "../product.types.js";

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

  static detailsResponse(product: ProductDetailsWithRelations) {
    const price = product.prices[0];
    const batch = product.batches[0];
    const inventory = product.inventories[0];
    const manufacturer = product.productManufacturer[0]?.manufacturer;
    const certification = product.certifications[0];

    return {
      id: product.id,
      code: product.code,
      barcode: product.barcode ?? "",
      name: product.name,
      commonName: product.commonName ?? "",
      botanicalName: product.botanicalName ?? "",
      brand: product.brand ?? "",
      category: product.category,
      type: product.type,
      grade: product.grade ?? "",
      form: product.form ?? "OTHER",
      hsn: product.hsn ?? "",
      unit: product.unit,
      fssaiLicense: manufacturer?.fssaiLicense ?? "",
      ingredients: product.ingredients ?? "",
      allergenInfo: product.allergenInfo ?? "",
      storageInstructions: product.storageInstructions ?? "",
      vegNonVeg: product.vegNonVeg,
      countryOfOrigin:
        manufacturer?.countryOfOrigin ?? product.countryOfOrigin ?? "",
      customerCarePhone: manufacturer?.customerCarePhone ?? "",
      customerCareEmail: manufacturer?.customerCareEmail ?? "",
      manufacturerName: manufacturer?.name ?? "",
      manufacturerAddress: manufacturer?.address ?? "",
      rawMaterialSource: product.rawMaterialSource ?? "",
      productionDate: batch?.productionDate?.toISOString().slice(0, 10) ?? "",
      mfgDate: batch?.mfgDate?.toISOString().slice(0, 10) ?? "",
      expiryDate: batch?.expiryDate?.toISOString().slice(0, 10) ?? "",
      bestBefore: batch?.bestBefore ?? "",
      batchNo: batch?.batchNo ?? "",
      plantId: batch?.plantId ?? product.plantId ?? "",
      moistureContent:
        batch?.moistureContent?.toString() ??
        product.moistureContent?.toString() ??
        "",
      purityTest: batch?.purityTest ?? product.purityTest ?? "",
      adulterationTest:
        batch?.adulterationTest ?? product.adulterationTest ?? "",
      processingMethod:
        batch?.processingMethod ?? product.processingMethod ?? "",
      pesticideTestRef:
        batch?.pesticideTestRef ?? product.pesticideTestRef ?? "",
      packagingType: product.packagingType ?? "",
      packSize: product.packSize ?? "",
      netWeight: product.netWeight ?? "",
      shelfLife: product.shelfLife?.toString() ?? "",
      warehouseLocation: inventory?.warehouseLocation ?? "",
      currentStock: inventory?.currentStock?.toString() ?? "",
      reorderLevel: inventory?.reorderLevel?.toString() ?? "",
      mrp: price?.mrp?.toString() ?? "",
      distributorPrice: price?.distributorPrice?.toString() ?? "",
      retailerPrice: price?.retailerPrice?.toString() ?? "",
      dealerPrice: price?.dealerPrice?.toString() ?? "",
      purchaseCost: price?.purchaseCost?.toString() ?? "",
      manufacturingCost: price?.manufacturingCost?.toString() ?? "",
      gst: price?.gst?.toString() ?? "",
      discountScheme: price?.discountScheme ?? "",
      certifications: certification?.name ?? "",
      exportCertNumber: certification?.certificateNumber ?? "",
    };
  }

  static deleteResponse(product: Product): string {
    return product.id;
  }
}
