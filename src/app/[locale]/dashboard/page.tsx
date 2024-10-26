import DashboardContainer from "@/components/dashboard/DashboardContainer";
import MainLayout from "@/layouts/MainLayout";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Dashboard - CMS",
};

interface IProps {
  params: { locale: string };
}

export default function Home({ params: { locale } }: IProps) {
  setRequestLocale(locale);

  return (
    <MainLayout>
      <div className="overflow-hidden">
        <DashboardContainer />
      </div>
    </MainLayout>
  );
}
