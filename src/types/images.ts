import { IResponsePaginationBase } from ".";

export interface IImage {
  id: string;
  public_id: string;
  name: string;
  created_at: string;
}

export interface IImagesPaginationResponse extends IResponsePaginationBase {
  items: IImage[];
}

export interface IImagesResponse {
  statusCode: number;
  data: IImagesPaginationResponse;
}

export interface IImagesForm {
  public_id: string;
  name: string;
  updated_at?: string;
  files?: FileList;
}

export interface IImageDetai extends IImage {
  message?: string;
}

export interface IImageDetailResponse {
  statusCode: number;
  data: IImageDetai;
}
