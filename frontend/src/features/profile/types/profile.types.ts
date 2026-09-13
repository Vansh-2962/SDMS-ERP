export interface SaveProfileData {
  id?: string;
  companyName: string;
  gstin: string;
  pan: string;
  fssai: string;
  mobile: string;
  email: string;
  website: string;
  address: string;
}

export interface ProfileType {
  GSTIN: string;
  address: string;
  companyName: string;
  createdAt: Date | string;
  email: string;
  fssai: string;
  id: string;
  mobile: string | number;
  pan: string;
  updatedAt: Date | string;
  website: string;
}
