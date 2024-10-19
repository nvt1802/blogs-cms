import PostCreateContainer from "@/components/posts/PostCreateContainer";
import MainLayout from "@/layouts/MainLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Post - Dashboard CMS",
};

interface PostPageProps {
  params: {
    slug: string;
  };
}

const CreatePost = ({ params }: PostPageProps) => {
  return (
    <MainLayout>
      <PostCreateContainer slug={params.slug} />
    </MainLayout>
  );
};

export default CreatePost;
