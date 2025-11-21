import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import { ReturnButton } from "@/components/ReturnButton";

export default function ForgetPasswordPage() {
  return (
    <div className="px-4 flex flex-col h-screen justify-center items-center w-full max-w-md mx-auto space-y-8">
      <div className="space-y-4">
        <ReturnButton href="/auth/login" label="Login" />

        <h1 className="text-3xl font-bold">Forgot Password</h1>

        <p className="text-muted-foreground">
          Please enter your email address to receive a password reset link.
        </p>

        <ForgotPasswordForm />
      </div>
    </div>
  );
}
