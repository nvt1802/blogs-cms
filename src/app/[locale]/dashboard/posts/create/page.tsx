import PostCreateContainer from "@/components/posts/PostCreateContainer";
import MainLayout from "@/layouts/MainLayout";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Create New Post - Dashboard CMS",
};

interface IProps {
  params: {
    locale: string;
  };
}

const CreatePost = ({ params: { locale } }: IProps) => {
  setRequestLocale(locale);

  return (
    <MainLayout>
      <PostCreateContainer />
    </MainLayout>
  );
};

export default CreatePost;
