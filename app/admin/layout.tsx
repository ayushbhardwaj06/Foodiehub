import React from "react";

export default function layoutAdmin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div suppressHydrationWarning>{children}</div>;
}
