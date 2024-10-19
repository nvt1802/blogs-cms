import { IFileResponse } from "@/types/files";
import axiosInstance from "../axiosInstance";

export const uploadSingeFile = async (fileList: FileList) => {
  const formData = new FormData();
  formData.append("file", fileList[0]);
  const { data } = await axiosInstance.post<IFileResponse>(
    `/api/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data.data;
};
