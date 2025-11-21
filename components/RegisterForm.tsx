"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { signUpEmailAction } from "@/actions/signUpEmailAction";

export default function RegisterForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);

    const { error } = await signUpEmailAction(formData);
    if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success("Registration complete. You're all set.");
      router.push("/auth/register/success");
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" w-full space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        Register
      </Button>
    </form>
  );
}
