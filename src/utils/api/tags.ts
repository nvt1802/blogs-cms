import { ITagsResponse } from "@/types/tags";
import axiosInstance from "../axiosInstance";
import { pageLimit } from "../contants";

export const fetchTags = async (page: number) => {
  const { data } = await axiosInstance.get<ITagsResponse>(
    `/api/tags?page=${page}&limit=${pageLimit}`
  );
  return data.data;
};
