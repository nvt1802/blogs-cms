import { IPostDetailResponse, IPostForm, IPostResponse } from "@/types/posts";
import axiosInstance from "../axiosInstance";
import { pageLimit, PostStatus } from "../contants";

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

export const updatePost = async (slug: string, post: IPostForm) => {
  const { data } = await axiosInstance.put<IPostDetailResponse>(
    `/api/posts/${slug}`,
    post
  );
  return data.data;
};

export const updateTagsOfPost = async (slug: string, tags_id: string[]) => {
  const { data } = await axiosInstance.put<IPostDetailResponse>(
    `/api/posts/tags/${slug}`,
    { tags_id }
  );
  return data.data;
};

export const updateStatusOfPost = async (id: string, status: PostStatus) => {
  const { data } = await axiosInstance.post<IPostDetailResponse>(
    `/api/posts/publish`,
    {
      id,
      status,
    }
  );
  return data.data;
};
