"use client";

import React, { useState, useEffect } from "react";
import { ReturnButton } from "@/components/ReturnButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { addStoragePasswordAction } from "@/actions/addStoragePasswordAction";
import { getStoredPasswords } from "@/actions/getStoredPasswordAction";
import deleteStoragePasswordAction from "@/actions/deleteStoragePasswordAction";
import { editStoragePasswordAction } from "@/actions/editStoragePasswordAction";

type PasswordEntry = {
  id: string;
  website: string;
  username: string;
  password: string;
};

export default function Page() {
  const [passwordEntries, setPasswordEntries] = useState<PasswordEntry[]>([]);
  const [newEntry, setNewEntry] = useState<Partial<PasswordEntry>>({});
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>(
    {}
  );
  const [editModeId, setEditModeId] = useState<string | null>(null);
  const [editEntry, setEditEntry] = useState<Partial<PasswordEntry>>({});

  useEffect(() => {
    async function fetchPasswords() {
      const result = await getStoredPasswords();
      if (result.error) {
        toast.error(result.error);
      } else {
        setPasswordEntries(result.passwords as PasswordEntry[]);
      }
    }
    fetchPasswords();
  }, []);

  const handleInputChange = (field: keyof PasswordEntry, value: string) => {
    setNewEntry((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!newEntry.website || !newEntry.username || !newEntry.password) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const formData = new FormData();
    formData.append("website", newEntry.website);
    formData.append("username", newEntry.username);
    formData.append("password", newEntry.password);

    const res = await addStoragePasswordAction(formData);

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Password saved!");
      const entry: PasswordEntry = {
        id: res.id || Date.now().toString(),
        website: newEntry.website,
        username: newEntry.username,
        password: newEntry.password,
      };
      setPasswordEntries((prev) => [entry, ...prev]);
      setNewEntry({});
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteStoragePasswordAction(id);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Deleted password entry.");
      setPasswordEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const handleToggleShow = (id: string) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  // Edit handlers
  const startEditing = (entry: PasswordEntry) => {
    setEditModeId(entry.id);
    setEditEntry({ ...entry });
  };

  const cancelEditing = () => {
    setEditModeId(null);
    setEditEntry({});
  };

  const handleEditInputChange = (field: keyof PasswordEntry, value: string) => {
    setEditEntry((prev) => ({ ...prev, [field]: value }));
  };

  const saveEdit = async () => {
    if (
      !editEntry.id ||
      !editEntry.website ||
      !editEntry.username ||
      !editEntry.password
    ) {
      toast.error("Please fill in all fields to save.");
      return;
    }

    const res = await editStoragePasswordAction({
      id: editEntry.id,
      website: editEntry.website,
      username: editEntry.username,
      password: editEntry.password,
    });

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Password updated!");
      setPasswordEntries((prev) =>
        prev.map((p) =>
          p.id === editEntry.id
            ? {
                id: editEntry.id!,
                website: editEntry.website!,
                username: editEntry.username!,
                password: editEntry.password!,
              }
            : p
        )
      );
      cancelEditing();
    }
  };

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-4">
        <ReturnButton href="/profile" label="Profile" />
        <h1 className="text-3xl font-bold">Password Storage</h1>
        <p className="p-2 rounded-md text-lg bg-green-600 text-white font-bold">
          ACCESS GRANTED
        </p>
      </div>

      <div className="grid gap-6">
        {/* Add New Password Card */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Password</CardTitle>
            <CardDescription>Store a new website credential</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  placeholder="example.com"
                  value={newEntry.website || ""}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username/Email</Label>
                <Input
                  id="username"
                  placeholder="your@email.com"
                  value={newEntry.username || ""}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={newEntry.password || ""}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full md:w-auto" onClick={handleSave}>
              Save Password
            </Button>
          </CardFooter>
        </Card>

        {/* Password List */}
        <div className="grid gap-4">
          <h2 className="text-xl font-semibold">Stored Passwords</h2>
          {passwordEntries.length === 0 && (
            <p className="text-gray-500">No passwords saved yet.</p>
          )}
          {passwordEntries.map((entry) => (
            <Card key={entry.id}>
              <CardHeader>
                <CardTitle className="flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Website */}
                  {editModeId === entry.id ? (
                    <Input
                      className="flex-grow max-w-xs"
                      value={editEntry.website || ""}
                      onChange={(e) =>
                        handleEditInputChange("website", e.target.value)
                      }
                    />
                  ) : (
                    <span className="flex-grow max-w-xs truncate">
                      {entry.website}
                    </span>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-2">
                    {editModeId === entry.id ? (
                      <>
                        <Button size="sm" onClick={saveEdit}>
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEditing}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEditing(entry)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(entry.id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>

              {/* Username and Password displayed below */}
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Username</Label>
                  {editModeId === entry.id ? (
                    <Input
                      value={editEntry.username || ""}
                      onChange={(e) =>
                        handleEditInputChange("username", e.target.value)
                      }
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Input value={entry.username} readOnly />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(entry.username)}
                      >
                        Copy
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <Label>Password</Label>
                  {editModeId === entry.id ? (
                    <Input
                      type="text"
                      value={editEntry.password || ""}
                      onChange={(e) =>
                        handleEditInputChange("password", e.target.value)
                      }
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Input
                        type={showPasswords[entry.id] ? "text" : "password"}
                        value={entry.password}
                        readOnly
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(entry.password)}
                      >
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleShow(entry.id)}
                      >
                        {showPasswords[entry.id] ? "Hide" : "Show"}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
