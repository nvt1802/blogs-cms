import {
  ICategoriesResponse,
  ICategoriesForm,
  ICategoriesDetailResponse,
} from "@/types/categories";
import axiosInstance from "../axiosInstance";
import { pageLimit } from "../contants";

export const fetchCategories = async (page: number) => {
  const { data } = await axiosInstance.get<ICategoriesResponse>(
    `/api/categories?page=${page}&limit=${pageLimit}`
  );
  return data.data;
};

export const addNewCategories = async (tagForm: ICategoriesForm) => {
  const { data } = await axiosInstance.post<ICategoriesDetailResponse>(
    `/api/categories`,
    tagForm
  );
  return data.data;
};

export const updateCategories = async (
  categoryId: string,
  tagForm: ICategoriesForm
) => {
  const { data } = await axiosInstance.put<ICategoriesDetailResponse>(
    `/api/categories/${categoryId}`,
    tagForm
  );
  return data.data;
};

export const deleteCategories = async (categoryId: string) => {
  const { data } = await axiosInstance.delete<ICategoriesDetailResponse>(
    `/api/categories/${categoryId}`
  );
  return data.data;
};
