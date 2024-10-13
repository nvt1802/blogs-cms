import FormLogin from "@/components/auth/FormLogin";
import AuthLayout from "@/layouts/AuthLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Dashboard CMS",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="w-full m-auto">
        <FormLogin />
      </div>
    </AuthLayout>
  );
}
