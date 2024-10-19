import PostCreateContainer from "@/components/posts/PostCreateContainer";
import MainLayout from "@/layouts/MainLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Post - Dashboard CMS",
};

const CreatePost = () => {
  return (
    <MainLayout>
      <PostCreateContainer />
    </MainLayout>
  );
};

export default CreatePost;
