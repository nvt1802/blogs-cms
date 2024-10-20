import { IResponsePaginationBase } from ".";

export interface ITags {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface ITagsPaginationResponse extends IResponsePaginationBase {
  items: ITags[];
}

export interface ITagsResponse {
  statusCode: number;
  data: ITagsPaginationResponse;
}

export interface ITagForm {
  name: string;
  slug: string;
  updated_at?: string;
}

export interface ITagDetai extends ITags {
  message?: string;
}

export interface ITagsDetailResponse {
  statusCode: number;
  data: ITagDetai;
}
