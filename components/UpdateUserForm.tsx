"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UpdateUserFormProps {
  name: string;
  image: string;
  phone: string;
}

export const UpdateUserForm = ({ name, image, phone }: UpdateUserFormProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);
    const name = formData.get("name")?.toString().trim();
    const image = formData.get("image")?.toString().trim();
    const phoneStr = formData.get("phone")?.toString().trim();

    if (!name && !image && !phoneStr) {
      return toast.error("Please enter a name, image, or phone number");
    }

    await updateUser({
      ...(name && { name }),
      ...(image && { image }),
      ...(phoneStr && { phone: phoneStr }),
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
          toast.success("User updated successfully");
          (evt.target as HTMLFormElement).reset();
          router.refresh();
        },
      },
    });
  }

  return (
    <form className="w-full  space-y-4" onSubmit={handleSubmit}>
      <div className="lg:grid lg:grid-cols-2 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" defaultValue={name} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="image">Image</Label>
          <Input id="image" name="image" defaultValue={image} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" defaultValue={phone} />
        </div>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Updating..." : "Update User"}
      </Button>
    </form>
  );
};
