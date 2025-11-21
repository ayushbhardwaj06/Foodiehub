import LoginForm from "@/components/LoginForm";
import MagicLinkLoginForm from "@/components/MagicLinkLoginForm";
import { ReturnButton } from "@/components/ReturnButton";
import SignInButton from "@/components/SignInButton";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="px-4 flex flex-col h-screen justify-center items-center w-full max-w-md mx-auto space-y-8">
      <div className="space-y-4 w-full">
        <ReturnButton href="/" label="Home" />

        <h1 className="text-3xl font-bold">Login</h1>
      </div>

      <div className="space-y-4 w-full">
        <MagicLinkLoginForm />

        <LoginForm />

        <p className="text-muted-foreground text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="hover:text-foreground">
            Register
          </Link>
        </p>
      </div>

      <hr className="w-full" />

      <div className="flex flex-col w-full gap-4">
        <SignInButton provider="google" />
        <SignInButton provider="github" />
      </div>
    </div>
  );
}
