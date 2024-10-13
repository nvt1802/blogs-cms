import { ICategoriesResponse } from "@/types/categories";
import axiosInstance from "../axiosInstance";
import { pageLimit } from "../contants";

export const fetchCategories = async (page: number) => {
  const { data } = await axiosInstance.get<ICategoriesResponse>(
    `/api/categories?page=${page}&limit=${pageLimit}`
  );
  return data.data;
};
