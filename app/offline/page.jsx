"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";

const OfflinePage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="logo mb-4">
        <img
          width={200}
          height={200}
          src="/images/icons/icon-512x512.png"
          alt="NextPGP Logo"
        />
      </div>
      <h1 className="text-2xl font-semibold mb-4">You&apos;re Offline</h1>
      <Button as={Link} href="/" className="mt-8">
        Go Home
      </Button>
    </div>
  );
};

export default OfflinePage;
