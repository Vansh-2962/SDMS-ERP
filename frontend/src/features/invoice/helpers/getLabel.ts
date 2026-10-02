export const InvoiceLabel = {
  TAX_INVOICE: "TAX_INVOICE",
  DELIVERY_CHALLAN: "DELIVERY_CHALLAN",
  PROFORMA_INVOICE: "PROFORMA_INVOICE",
  CREDIT_NOTE: "CREDIT_NOTE",
  DEBIT_NOTE: "DEBIT_NOTE",
} as const;

export const getLabel = (docType: string) => {
  if (docType === "invoice") {
    return InvoiceLabel.TAX_INVOICE;
  }
  if (docType === "challan") {
    return InvoiceLabel.DELIVERY_CHALLAN;
  }
  if (docType === "proforma") {
    return InvoiceLabel.PROFORMA_INVOICE;
  }
  if (docType === "credit") {
    return InvoiceLabel.CREDIT_NOTE;
  }
  if (docType === "debit") {
    return InvoiceLabel.DEBIT_NOTE;
  }
};
