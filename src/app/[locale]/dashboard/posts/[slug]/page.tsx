import PostDetailContainer from "@/components/posts/PostDetailContainer";
import MainLayout from "@/layouts/MainLayout";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Update Post - Dashboard CMS",
};

interface PostPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

const DetailPost = ({ params: { locale, slug } }: PostPageProps) => {
  setRequestLocale(locale);

  return (
    <MainLayout>
      <PostDetailContainer slug={slug} />
    </MainLayout>
  );
};

export default DetailPost;
