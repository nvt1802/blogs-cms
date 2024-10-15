import { IPostDetailResponse, IPostResponse } from "@/types/posts";
import axiosInstance from "../axiosInstance";
import { pageLimit } from "../contants";

export const fetchPosts = async (page: number) => {
  const { data } = await axiosInstance.get<IPostResponse>(
    `/api/posts?page=${page}&limit=${pageLimit}`
  );
  return data.data;
};

export const fetchPostsBySlug = async (slug: string) => {
  const { data } = await axiosInstance.get<IPostDetailResponse>(
    `/api/posts/${slug}`
  );
  return data.data;
};
