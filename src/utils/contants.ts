import { ITabItem } from "@/components/share/tabs/CMSTabs";

export const pageLimit = 6;
export const postTabs: ITabItem[] = [
  {
    name: "overview",
    status: "unknown",
  },
  {
    name: "content",
    status: "unknown",
  },
  {
    name: "seo",
    status: "unknown",
  },
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPostTabs = (t: any): ITabItem[] => {
  return postTabs.map((item) => ({ ...item, name: t(item?.name) }));
};

export enum PostStatus {
  PUBLISHED = "published",
  DRAFT = "draft",
}

export const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
