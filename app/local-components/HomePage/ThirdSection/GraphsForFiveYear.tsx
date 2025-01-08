import React from "react";
import SeatsGraph from "./SeatsGraph";
import CoursesAvailable from "./CoursesAvailable";
import RangeSelector from "./RangeSelector";
// const SeatsGraph = dynamic(() => import("@/app/local-components/SeatsGraph"));
// const CoursesAvailable = dynamic(
//   () => import("@/app/local-components/CoursesAvailable")
// );

const GraphsForFiveYear = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">5 year reports</h1>
      <RangeSelector />
      <div className="w-full h-[500px] flex items-center justify-center">
        <SeatsGraph />
        <CoursesAvailable />
      </div>
    </div>
  );
};

export default GraphsForFiveYear;
