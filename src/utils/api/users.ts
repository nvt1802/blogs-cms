import { IUsersResponse } from "@/types/users";
import axiosInstance from "../axiosInstance";
import { pageLimit } from "../contants";

export const fetchUsers = async (page: number) => {
  const { data } = await axiosInstance.get<IUsersResponse>(
    `/api/users?page=${page}&limit=${pageLimit}`
  );
  return data.data;
};
