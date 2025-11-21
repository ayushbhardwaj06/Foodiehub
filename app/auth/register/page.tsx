import RegisterForm from "@/components/RegisterForm";
import { ReturnButton } from "@/components/ReturnButton";
import SignInButton from "@/components/SignInButton";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="px-4 flex flex-col  h-screen justify-center items-center w-full max-w-md mx-auto space-y-8">
      <div className="space-y-4 w-full">
        <ReturnButton href="/" label="Home" />

        <h1 className="text-3xl font-bold">Register</h1>
      </div>

      <div className="space-y-4 w-full">
        <RegisterForm />

        <p className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="hover:text-foreground">
            Login
          </Link>
        </p>
      </div>

      <hr className="w-full" />

      <div className="flex flex-col w-full gap-4">
        <SignInButton provider="google" signUp />
        <SignInButton provider="github" signUp />
      </div>
    </div>
  );
}
