import PostContainer from "@/components/posts/PostContainer";
import MainLayout from "@/layouts/MainLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts - Dashboard CMS",
};

export default function Home() {
  return (
    <MainLayout>
      <PostContainer />
    </MainLayout>
  );
}
