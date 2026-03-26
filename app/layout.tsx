import type { Metadata } from "next";
import "./globals.css";
import { TasksProvider } from "@/context/TasksContext";

export const metadata: Metadata = {
  title: "Aria - AI Daily Planner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="lofi">
      <body className="antialiased">
        <TasksProvider>{children}</TasksProvider>
      </body>
    </html>
  );
}
