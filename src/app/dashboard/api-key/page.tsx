import ApiKeysContainer from "@/components/apiKeys/ApiKeysContainer";
import MainLayout from "@/layouts/MainLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Key - CMS",
};

export default function Home() {
  return (
    <MainLayout>
      <ApiKeysContainer />
    </MainLayout>
  );
}
