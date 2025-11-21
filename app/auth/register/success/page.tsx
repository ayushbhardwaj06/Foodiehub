import { ReturnButton } from "@/components/ReturnButton";

export default function PageSuccess() {
  return (
    <div className="px-4 flex flex-col h-screen justify-center items-center w-full max-w-md mx-auto space-y-8">
      <div className="space-y-4">
        <ReturnButton href="/auth/login" label="Login" />

        <h1 className="text-3xl font-bold">Success</h1>

        <p className="text-muted-foreground">
          Congratulations! You have successfully registered. Please check your
          email for the verification link.
        </p>
      </div>
    </div>
  );
}
