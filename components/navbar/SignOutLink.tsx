"use client";

import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { toast } from "sonner";

const SignOutLink = () => {
  const handleLogout = () => {
    toast("Logging out...");
  };

  return (
    <SignOutButton>
      <Link href="/" onClick={handleLogout} className="w-full text-left">
        Log Out
      </Link>
    </SignOutButton>
  );
};

export default SignOutLink;
