import FormLogin from "@/components/auth/FormLogin";
import AuthLayout from "@/layouts/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="w-full m-auto">
        <FormLogin />
      </div>
    </AuthLayout>
  );
}
