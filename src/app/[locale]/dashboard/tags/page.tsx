import TagsContainer from "@/components/tags/TagsContainer";
import MainLayout from "@/layouts/MainLayout";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Tags - CMS",
};

interface IProps {
  params: { locale: string };
}

const TagsPage = ({ params: { locale } }: IProps) => {
  setRequestLocale(locale);

  return (
    <MainLayout>
      <TagsContainer />
    </MainLayout>
  );
};

export default TagsPage;
