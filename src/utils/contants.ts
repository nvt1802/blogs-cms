import { ITabItem } from "@/components/share/tabs/CMSTabs";

export const pageLimit = 6;
export const postTabs: ITabItem[] = [
  {
    name: "Overview",
    status: "unknown",
  },
  {
    name: "Content",
    status: "unknown",
  },
  {
    name: "Seo",
    status: "unknown",
  },
];
export enum PostStatus {
  PUBLISHED = "published",
  DRAFT = "draft",
}

export const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
