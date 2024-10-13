import { IResponsePaginationBase } from ".";

export interface ICategories {
  id: string
  name: string
  slug: string
  description: string
  created_at: string
  updated_at: string
}

export interface ICategoriesPaginationResponse extends IResponsePaginationBase {
  items: ICategories[];
}

export interface ICategoriesResponse {
  statusCode: number;
  data: ICategoriesPaginationResponse;
}
