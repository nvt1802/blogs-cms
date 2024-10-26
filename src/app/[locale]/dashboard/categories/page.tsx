import CategoriesContainer from "@/components/categories/CategoriesContainer";
import MainLayout from "@/layouts/MainLayout";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Cateories - CMS",
};

interface IProps {
  params: { locale: string };
}

const CategoriesPage = ({ params: { locale } }: IProps) => {
  setRequestLocale(locale);

  return (
    <MainLayout>
      <CategoriesContainer />
    </MainLayout>
  );
};

export default CategoriesPage;
