import PostDetailContainer from "@/components/posts/PostDetailContainer";
import MainLayout from "@/layouts/MainLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts - Dashboard CMS",
};

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default function Home({ params }: PostPageProps) {
  return (
    <MainLayout>
      <PostDetailContainer slug={params.slug} />
    </MainLayout>
  );
}
