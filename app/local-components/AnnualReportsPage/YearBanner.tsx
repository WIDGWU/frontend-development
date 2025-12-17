import React from "react";

interface YearBannerProps {
  year: number;
}

const YearBanner = ({ year }: YearBannerProps) => {
  return (
    <div className="rounded-2xl bg-gradient-to-r to-blue-600 from-blue-400 text-white p-10 text-center text-lg shadow-sm">
      <p>
        Annual Report for <br />{" "}
        <span className="font-bold text-4xl">
          {year} - {year + 1} AY
        </span>
      </p>
    </div>
  );
};

export default YearBanner;
