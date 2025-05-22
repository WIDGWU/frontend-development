"use client";
import Image from "next/image";
import Search from "@/assets/search.png";
import Carol from "@/assets/Carol-Hayes.jpg";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";

const Navbar = () => {
  const { logout, user } = useAuth();

  return (
    <div className="flex items-center justify-between p-4">
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src={Search} alt="" width={14} height={14} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>
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
