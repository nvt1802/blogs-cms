import { IResponsePaginationBase } from ".";

export interface ITags {
  id: string
  name: string
  slug: string
  created_at: string
  updated_at: string
}

export interface ITagsPaginationResponse extends IResponsePaginationBase {
  items: ITags[];
}

export interface ITagsResponse {
  statusCode: number;
  data: ITagsPaginationResponse;
}
