"use client";
import Image from "next/image";
import Search from "@/assets/search.png";
import Carol from "@/assets/Carol-Hayes.jpg";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";

const Navbar = () => {
  const { logout, user } = useAuth(); // Get the logout function and user from context

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
        {/* User details - optionally show username from auth context */}
        <div className="flex flex-col mr-2">
          <span className="text-xs leading-3 font-medium">
            {user?.username || "Guest"}
          </span>
          <span className="text-[10px] text-gray-500 text-right">
            {user?.role || ""}
          </span>
        </div>

        <Image
          src={Carol}
          alt=""
          width={36}
          height={36}
          className="rounded-full"
        />

        <Button
          className="bg-red-600 hover:bg-red-700"
          onClick={logout} // Add the onClick handler
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
