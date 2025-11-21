"use client";
import { StarIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

export default function MagicLinkLoginForm() {
  const [isPending, setIsPending] = useState(false);
  const ref = useRef<HTMLDetailsElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email"));

    if (!email) return toast.error("Please enter your email.");

    await signIn.magicLink({
      email,
      name: email.split("@")[0],
      callbackURL: "/profile",
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Check your email for the magic link!");
          if (ref.current) ref.current.open = false;
        },
      },
    });
  };
  return (
    <details
      ref={ref}
      className="rounded-md border border-red-600 overflow-hidden"
    >
      <summary className="flex gap-2 items-center px-2 py-1  bg-red-600 text-white hover:bg-red-600/80 transition">
        Try Magic Link to Login <StarIcon size={16} />
      </summary>

      <form onSubmit={handleSubmit} className="px-2 py-1">
        <Label htmlFor="email" className="sr-only">
          Email
        </Label>
        <div className="flex gap-2 items-center">
          <Input type="email" id="email" name="email" />
          <Button disabled={isPending}>Send</Button>
        </div>
      </form>
    </details>
  );
}
