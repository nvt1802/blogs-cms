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

export interface ICategoriesForm {
  name: string;
  slug: string;
  description?: string;
}

export interface ICategoriesDetai extends ICategories {
  message?: string;
}

export interface ICategoriesDetailResponse {
  statusCode: number;
  data: ICategoriesDetai;
}