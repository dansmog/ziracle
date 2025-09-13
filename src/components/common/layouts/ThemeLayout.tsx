import React from "react";

export default function ThemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="px-4 md:px-4 lg:px-4 xl:px-0 max-w-[1120px] mx-auto">{children}</section>;
}
