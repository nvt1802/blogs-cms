export interface IResponsePaginationBase {
  page: number;
  limit: number;
  totalPages: number;
  totalItem: number;
}

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
