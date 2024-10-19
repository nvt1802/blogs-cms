import { IResponsePaginationBase } from ".";

export interface ICategoriesShort {
  name: string;
  slug: string;
}

export interface IUsersShort {
  username: string;
  profile_picture: string;
}

export interface ITagsShort {
  name: string;
  slug: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  profile_picture: string;
  password: string;
  role: "user" | "author" | "admin";
  created_at: string;
  updated_at: string;
}

export interface IUsersPaginationResponse extends IResponsePaginationBase {
  items: IUser[];
}

export interface IUsersResponse {
  statusCode: number;
  data: IUsersPaginationResponse;
}

export interface IUserInfo {
  email: string;
  profile_picture: string;
  role: "user" | "author" | "admin";
  username: string;
  first_name: string;
  last_name: string;
}

export interface IUsersInfoResponse {
  statusCode: number;
  data: IUserInfo;
}
