export interface IResponsePaginationBase {
  page: number;
  limit: number;
  totalPages: number;
  totalItem: number;
}

export interface ICategoriesShort {
  id: string;
  name: string;
  slug: string;
}

export interface IUsersShort {
  id: string;
  username: string;
  profile_picture: string;
}

export interface ITagsShort {
  id: string;
  name: string;
  slug: string;
}

export interface IOption {
  label?: string;
  value?: string | number;
}

export interface IToast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  duration?: number;
}