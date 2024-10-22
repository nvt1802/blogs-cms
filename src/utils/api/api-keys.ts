import {
  IApiKeyDetailResponse,
  IApiKeyForm,
  IApiKeyResponse,
} from "@/types/api-keys";
import axiosInstance from "../axiosInstance";
import { pageLimit } from "../contants";

export const fetchAllApiKeys = async (page: number) => {
  const { data } = await axiosInstance.get<IApiKeyResponse>(
    `/api/api-keys?page=${page}&limit=${pageLimit}`
  );
  return data.data;
};

export const createNewApiKey = async (apiKeyForm: IApiKeyForm) => {
  const { data } = await axiosInstance.post<IApiKeyDetailResponse>(
    `/api/api-keys`,
    apiKeyForm
  );
  return data.data;
};

export const deleteApiKey = async (id: string) => {
  const { data } = await axiosInstance.delete<IApiKeyDetailResponse>(
    `/api/api-keys/${id}`
  );
  return data.data;
};
