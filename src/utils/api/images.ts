import {
  IImageDetailResponse,
  IImagesForm,
  IImagesResponse,
} from "@/types/images";
import axiosInstance from "../axiosInstance";
import { pageLimit } from "../contants";

export const fetchImages = async (page: number) => {
  const { data } = await axiosInstance.get<IImagesResponse>(
    `/api/images?page=${page}&limit=${pageLimit}`
  );
  return data.data;
};

export const addNewImages = async (tagForm: IImagesForm) => {
  const { data } = await axiosInstance.post<IImageDetailResponse>(
    `/api/images`,
    tagForm
  );
  return data.data;
};

export const deleteImages = async (imageId: string) => {
  const { data } = await axiosInstance.delete<IImageDetailResponse>(
    `/api/images/${imageId}`
  );
  return data.data;
};
