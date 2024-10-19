import { ITabItem } from "@/components/share/tabs/CMSTabs";

export const pageLimit = 8;
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
