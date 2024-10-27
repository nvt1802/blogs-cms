import ImagesContainer from "@/components/images/ImagesContainer";
import MainLayout from "@/layouts/MainLayout";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Images - CMS",
};

interface IProps {
  params: { locale: string };
}

const ImagesPage = ({ params: { locale } }: IProps) => {
  setRequestLocale(locale);

  return (
    <MainLayout>
      <ImagesContainer />
    </MainLayout>
  );
};

export default ImagesPage;
