import Menu from "@/app/local-components/Menu";
import Navbar from "@/app/local-components/Navbar";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/WID_logo.png";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 bg-primary">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src={Logo} alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold">
            Writing in Disciplines
          </span>
        </Link>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-secondary overflow-scroll flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}