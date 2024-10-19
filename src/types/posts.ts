import {
  ICategoriesShort,
  IResponsePaginationBase,
  ITagsShort,
  IUsersShort,
} from ".";

export interface IPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author_id: string;
  category_id: string;
  published_at: string;
  updated_at: string;
  status: "published" | "draft";
  featured_image: string;
  view_count: number;
  likes_count: number;
  is_featured: boolean;
  created_at: string;
  categories: ICategoriesShort;
  users: IUsersShort;
  tags: ITagsShort[];
  seo_title?: string;
  is_index?: boolean;
  is_follow?: boolean;
}

export interface IPostPaginationResponse extends IResponsePaginationBase {
  items: IPost[];
}

export interface IPostResponse {
  statusCode: number;
  data: IPostPaginationResponse;
}

export interface IPostFormInput {
  overview: {
    title: string;
    slug: string;
    featuredImage?: string;
    category_id?: string;
    tag_id?: string[];
  };
  content: string;
  seo: {
    isIndex: boolean;
    isFollow: boolean;
    seoTitle: string;
    excerpt: string;
  };
}

export interface IPostDetailResponse {
  statusCode: number;
  data: IPost;
}

export interface IPostForm {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author_id: string;
  category_id: string;
  status: string;
  featured_image: string;
  is_index: boolean;
  is_follow: boolean;
  seo_title: string;
  tags_id?: string[];
  featured_image_blob?: FileList | null
}
