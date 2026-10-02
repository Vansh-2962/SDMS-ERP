export const SupplyType = {
  TAXABLE: "TAXABLE",
  EXEMPT: "EXEMPT",
  EXPORT: "EXPORT",
  SEZ: "SEZ",
  NON_GST: "NON_GST",
} as const;

["Taxable", "Exempt", "Export", "SEZ", "Non-GST"];

export const getSupplyType = (supplyType: string) => {
  if (supplyType === "Taxable") {
    return SupplyType.TAXABLE;
  }
  if (supplyType === "Exempt") {
    return SupplyType.EXEMPT;
  }
  if (supplyType === "Export") {
    return SupplyType.EXPORT;
  }
  if (supplyType === "SEZ") {
    return SupplyType.SEZ;
  }
  if (supplyType === "Non-GST") {
    return SupplyType.NON_GST;
  }
};
