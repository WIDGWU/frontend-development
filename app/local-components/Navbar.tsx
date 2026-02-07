"use client";
import Image from "next/image";
import Carol from "@/assets/Carol-Hayes.jpg";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PAGES } from "../helpers/constants";

const Navbar = () => {
  const pathname = usePathname();

  const [pageTitle, setPageTitle] = useState("");

  const { logout, user } = useAuth();

  useEffect(() => {
    const pathList = pathname.split("/");
    const activePage = pathList[2];

    const title =
      PAGES.find((page) => page.rootLink.includes(activePage))?.name ||
      "Dashboard";
    setPageTitle(title);
  }, [pathname]);

  return (
    <div className="flex items-center justify-between p-4">
      <h1 className="w-full text-2xl text-primary font-bold">{pageTitle}</h1>

      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        {/* User details */}
        <div className="flex flex-col mr-2">
          <span className="text-xs leading-3 font-medium">
            {user?.email || "User"}
          </span>

          <span className="text-xs text-gray-500">Admin</span>
        </div>

        <Image
          src={Carol}
          alt=""
          width={40}
          height={40}
          className="rounded-full object-cover"
        />

        <Button onClick={logout} variant="outline" size="sm">
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
