import PostContainer from "@/components/posts/PostContainer";
import MainLayout from "@/layouts/MainLayout";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Posts - Dashboard CMS",
};

interface IProps {
  params: { locale: string };
}

const PostsPage = ({ params: { locale } }: IProps) => {
  setRequestLocale(locale);

  return (
    <MainLayout>
      <PostContainer />
    </MainLayout>
  );
};

export default PostsPage;
