import { ITagForm, ITagsDetailResponse, ITagsResponse } from "@/types/tags";
import axiosInstance from "../axiosInstance";
import { pageLimit } from "../contants";

export const fetchTags = async (page: number) => {
  const { data } = await axiosInstance.get<ITagsResponse>(
    `/api/tags?page=${page}&limit=${pageLimit}`
  );
  return data.data;
};

export const addNewTag = async (tagForm: ITagForm) => {
  const { data } = await axiosInstance.post<ITagsDetailResponse>(
    `/api/tags`,
    tagForm
  );
  return data.data;
};

export const updateTag = async (tagId: string, tagForm: ITagForm) => {
  const { data } = await axiosInstance.put<ITagsDetailResponse>(
    `/api/tags/${tagId}`,
    tagForm
  );
  return data.data;
};

export const deleteTag = async (tagId: string) => {
  const { data } = await axiosInstance.delete<ITagsDetailResponse>(
    `/api/tags/${tagId}`
  );
  return data.data;
};
