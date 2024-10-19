import PostDetailContainer from "@/components/posts/PostDetailContainer";
import MainLayout from "@/layouts/MainLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Post - Dashboard CMS",
};

interface PostPageProps {
  params: {
    slug: string;
  };
}

const DetailPost = ({ params }: PostPageProps) => {
  return (
    <MainLayout>
      <PostDetailContainer slug={params.slug} />
    </MainLayout>
  );
};

export default DetailPost;
