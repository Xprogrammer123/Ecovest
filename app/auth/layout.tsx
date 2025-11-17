import React from "react";
import "../globals.css"; // adjust if needed

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Authentication – Ecovest</title>
        <meta name="description" content="Login to your Ecovest account" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
