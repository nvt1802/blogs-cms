import CategoriesTable from "@/components/categories/CategoriesTable";
import MainLayout from "@/layouts/MainLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - CMS",
};

export default function Home() {
  return (
    <MainLayout>
      <div className="p-4">
        <CategoriesTable />
      </div>
    </MainLayout>
  );
}
