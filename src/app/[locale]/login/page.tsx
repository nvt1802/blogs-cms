import LoginContainer from "@/components/LoginContainer";
import AuthLayout from "@/layouts/AuthLayout";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Login - Dashboard CMS",
};

interface IProps {
  params: { locale: string };
}

export default function LoginPage({ params: { locale } }: IProps) {
  setRequestLocale(locale);

  return (
    <AuthLayout>
      <LoginContainer />
    </AuthLayout>
  );
}
