import { ReturnButton } from "@/components/ReturnButton";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function ErrorPage({ searchParams }: PageProps) {
  const error = (await searchParams).error;

  return (
    <div className="px-4 flex flex-col h-screen justify-center items-center w-full max-w-md mx-auto space-y-8">
      <div className="space-y-4">
        <ReturnButton href="/auth/login" label="Login" />

        <h1 className="text-3xl font-bold">Login Error</h1>
      </div>

      <p className="text-destructive">
        {error === "account_not_linked"
          ? "This account is already linked to another sign-in method."
          : "Oops! Something went wrong. Please try again."}
      </p>
    </div>
  );
}
