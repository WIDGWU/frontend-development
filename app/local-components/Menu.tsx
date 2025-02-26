import Image from "next/image";
import Link from "next/link";
import homeIcon from "@/assets/home.png";
import departmentsIcon from "@/assets/departments.png";
import graduateAssistantsIcon from "@/assets/graduate-assistants.png";
import coursesIcon from "@/assets/courses.png";
import annualReportIcon from "@/assets/annual-report.png";
import courseHistoryIcon from "@/assets/course-history.png";
import uploadCoursesIcon from "@/assets/upload-courses.png";

// these are all the menu items that will be displayed in the admin dashboard
const menuItems = [
  { name: "Home", href: "/admin", icon: homeIcon },
  { name: "Departments", href: "/admin/departments", icon: departmentsIcon },
  {
    name: "Graduate Assistants",
    href: "/admin/graduate-assistants",
    icon: graduateAssistantsIcon,
  },
  { name: "Courses", href: "/admin/courses", icon: coursesIcon },
  {
    name: "Annual report",
    href: "/admin/annual-report",
    icon: annualReportIcon,
  },
  {
    name: "Course Approval",
    href: "/admin/course-approval",
    icon: courseHistoryIcon,
  },
  {
    name: "Upload Courses",
    href: "/admin/upload-courses",
    icon: uploadCoursesIcon,
  },
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm ">
      {menuItems.map((item) => (
        <div className="flex flex-col gap-4" key={item.name}>
          <Link
            href={item.href}
            className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
          >
            <Image src={item.icon} alt={item.name} width={20} height={20} />
            <span className="hidden lg:block">{item.name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;
