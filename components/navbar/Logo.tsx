import { LuCodeXml } from "react-icons/lu";
import { Button } from "../ui/button";
import Link from "next/link";

const Logo = () => {
  return (
    <Button size="icon" asChild>
      <Link href="/">
        <LuCodeXml className="w-6 h-6" />
      </Link>
    </Button>
  );
};

export default Logo;
