import ApiKeysContainer from "@/components/apiKeys/ApiKeysContainer";
import MainLayout from "@/layouts/MainLayout";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "API Key - CMS",
};

interface IProps {
  params: { locale: string };
}

const ApiKeyPage = ({ params: { locale } }: IProps) => {
  setRequestLocale(locale);

  return (
    <MainLayout>
      <ApiKeysContainer />
    </MainLayout>
  );
};

export default ApiKeyPage;
