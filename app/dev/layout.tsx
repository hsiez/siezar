import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dev — Siezar",
  description: "Developer schematic.",
};

export default function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
