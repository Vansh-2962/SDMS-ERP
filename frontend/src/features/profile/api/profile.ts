import { axiosInstance } from "@/config/axios";
import { SaveProfileData } from "../types/profile.types";
import { SaveBankData } from "../types/bank.types";
import { SaveSettingsData } from "../types/settings.types";

export const saveProfile = async (data: SaveProfileData) => {
  const response = await axiosInstance.post(`/profile`, data);
  return response.data;
};

export const saveBankDetails = async (data: SaveBankData) => {
  const response = await axiosInstance.post(`/profile/bank`, data);
  return response.data;
};

export const saveSettings = async (data: SaveSettingsData) => {
  const response = await axiosInstance.post(`/profile/settings`, data);
  return response.data;
};

export const getSettings = async () => {
  const response = await axiosInstance.get(`/profile/settings`);
  return response.data;
};
export const getBankDetails = async () => {
  const response = await axiosInstance.get(`/profile/bank`);
  return response.data;
};
export const getProfile = async () => {
  const response = await axiosInstance.get(`/profile`);
  return response.data;
};
