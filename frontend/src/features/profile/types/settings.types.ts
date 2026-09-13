export interface SaveSettingsData {
  invPrefix: string;
  finYearStart: Date | string;
  paymentTerms: number;
}

export interface SettingsType {
  id: string;
  invPrefix: string;
  finYearStart: Date | string;
  paymentTerms: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}
