import dynamic from "next/dynamic";
import TermSelector from "@/app/local-components/TermSelector";

const TermCard = dynamic(() => import("@/app/local-components/TermCard"));
const SeatsGraph = dynamic(() => import("@/app/local-components/SeatsGraph"));
const CoursesAvailable = dynamic(
  () => import("@/app/local-components/CoursesAvailable")
);
const DifferenceCard = dynamic(
  () => import("@/app/local-components/DifferenceCard")
);

const AdminPage = () => {
  const fallCodeData = [{ name: "fall", value: 4739, color: "#ff7f50" }];
  const springCodeData = [{ name: "spring", value: 5, color: "#76c043" }];
  const summerCodeData = [{ name: "summer", value: 867, color: "#ffd700" }];

  return (
    <main className="m-4">
      <TermSelector />
      <div className="flex gap-4 justify-between flex-wrap my-4">
        <TermCard term="Fall" data={fallCodeData} />
        <TermCard term="Spring" data={springCodeData} />
        <TermCard term="Summer" data={summerCodeData} />
      </div>
      <div className="flex gap-4 justify-between flex-wrap my-4">
        <DifferenceCard
          text="Difference in Seats compared to previous year (2023-2024)"
          difference="-5162"
          percent="-48"
        />
        <DifferenceCard
          text="Difference in Enrolled Seats compared to previous year (2023-2024)"
          difference="-7281"
          percent="-97"
        />
        <DifferenceCard
          text="Difference in Sections compared to previous year (2023-2024)"
          difference="-223"
          percent="-45"
        />
        <DifferenceCard
          text="Difference in Courses compared to previous year (2023-2024)"
          difference="-64"
          percent="-32"
        />
      </div>
      <div className="w-full h-[500px] flex items-center justify-center">
        <SeatsGraph />
        <CoursesAvailable />
      </div>
    </main>
  );
};

export default AdminPage;
