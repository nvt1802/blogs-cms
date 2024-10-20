import TagsContainer from "@/components/tags/TagsContainer";
import MainLayout from "@/layouts/MainLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - CMS",
};

export default function Home() {
  return (
    <MainLayout>
      <TagsContainer />
    </MainLayout>
  );
}
