"use client";

import { Button } from "@/components/ui/button";
import { LuShare2 } from "react-icons/lu";
import { toast } from "sonner";

const ShareBtn = () => {
  const copyProductLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard", {
        cancel: { label: "Cancel", onClick: () => {} },
      });
    } catch {
      toast.error("Could not copy link", {
        cancel: { label: "Cancel", onClick: () => {} },
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="p-2"
      onClick={copyProductLink}
    >
      <LuShare2 />
    </Button>
  );
};

export default ShareBtn;
