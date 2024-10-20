import LoginContainer from "@/components/LoginContainer";
import AuthLayout from "@/layouts/AuthLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Dashboard CMS",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginContainer />
    </AuthLayout>
  );
}
