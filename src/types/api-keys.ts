import { IResponsePaginationBase } from ".";

export interface IApiKeys {
  id: string;
  name: string;
  duration?: "limited" | "unlimited";
  expiry_date?: string;
  created_at: string;
  token: string;
  secret_key: string;
}

export interface IApiKeysPaginationResponse extends IResponsePaginationBase {
  items: IApiKeys[];
}

export interface IApiKeyResponse {
  statusCode: number;
  data: IApiKeysPaginationResponse;
}

export interface IApiKeyForm {
  name: string;
  duration?: "limited" | "unlimited";
  expiry_date?: string;
  secret_key: string;
  unit?: "y" | "w" | "d" | "h" | "m" | "s";
  value?: number;
}

export interface IApiKeyDetai extends IApiKeys {
  message?: string;
}

export interface IApiKeyDetailResponse {
  statusCode: number;
  data: IApiKeyDetai;
}
