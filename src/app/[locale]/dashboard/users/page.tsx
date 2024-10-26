import UserTable from "@/components/users/UserTable";
import MainLayout from "@/layouts/MainLayout";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Users - CMS",
};

interface IProps {
  params: { locale: string };
}

const UsersPage = ({ params: { locale } }: IProps) => {
  setRequestLocale(locale);

  return (
    <MainLayout>
      <UserTable />
    </MainLayout>
  );
};

export default UsersPage;
