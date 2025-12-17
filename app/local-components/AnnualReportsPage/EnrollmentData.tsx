"use client";
import { getCourseReports } from "@/app/api/reports";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface EnrollmentDataProps {
  year: number;
}

const EnrollmentData = ({ year }: EnrollmentDataProps) => {
  const { data: reports, isLoading: isReportsLoading } = useQuery({
    queryKey: ["courseReports", year],
    queryFn: () => getCourseReports(year),
  });

  if (isReportsLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-5 text-xl mb-10">
      <h1 className="font-medium text-xl">Enrollment Data</h1>

      <div className="grid grid-cols-2 gap-5">
        <div className="border border-blue-900 rounded-lg">
          <h2 className="rounded-t p-2 bg-blue-900 text-white">Total</h2>
          <div className="grid grid-cols-2 gap-10 p-4 bg-blue-900/5">
            <div>
              <p>Total Seats Offered</p>
              <p className="font-semibold text-3xl">
                {reports.total_seats.toLocaleString()}
              </p>
            </div>
            <div>
              <p>Total Enrollment</p>
              <p className="font-semibold text-3xl">
                {reports.total_enrollment.toLocaleString()}
              </p>
            </div>
            <div>
              <p>WID Course Sections Offered</p>
              <p className="font-semibold text-3xl">
                {reports.total_courses.toLocaleString()}
              </p>
            </div>
            <div>
              <p>Seat Occupancy Rate</p>
              <p className="font-semibold text-3xl">
                {(
                  (reports.total_enrollment / reports.total_seats) *
                  100
                ).toFixed(2)}
                %
              </p>
            </div>
          </div>
        </div>

        <div className="border border-[#fc8d08] rounded-lg">
          <h2 className="rounded-t p-2 bg-[#fc8d08] text-white">Summer {year}</h2>
          <div className="grid grid-cols-2 gap-10 p-4 bg-[#fc8d08]/5">
            <div>
              <p>Total Seats Offered</p>
              <p className="font-semibold text-3xl">
                {reports.total_summer_seats.toLocaleString()}
              </p>
            </div>
            <div>
              <p>Total Enrollment</p>
              <p className="font-semibold text-3xl">
                {reports.total_summer_enrollment.toLocaleString()}
              </p>
            </div>
            <div>
              <p>WID Course Sections Offered</p>
              <p className="font-semibold text-3xl">
                {reports.total_summer_courses.toLocaleString()}
              </p>
            </div>
            <div>
              <p>Seat Occupancy Rate</p>
              <p className="font-semibold text-3xl">
                {(
                  (reports.total_summer_enrollment /
                    reports.total_summer_seats) *
                  100
                ).toFixed(2)}
                %
              </p>
            </div>
          </div>
        </div>

        <div className="border border-[#e29380] rounded-lg">
          <h2 className="rounded-t p-2 bg-[#e29380] text-white">Fall {year}</h2>
          <div className="grid grid-cols-2 gap-10 p-4 bg-[#e29380]/5">
            <div>
              <p>Total Seats Offered</p>
              <p className="font-semibold text-3xl">
                {reports.total_fall_seats.toLocaleString()}
              </p>
            </div>
            <div>
              <p>Total Enrollment</p>
              <p className="font-semibold text-3xl">
                {reports.total_fall_enrollment.toLocaleString()}
              </p>
            </div>
            <div>
              <p>WID Course Sections Offered</p>
              <p className="font-semibold text-3xl">
                {reports.total_fall_courses.toLocaleString()}
              </p>
            </div>
            <div>
              <p>Seat Occupancy Rate</p>
              <p className="font-semibold text-3xl">
                {(
                  (reports.total_fall_enrollment / reports.total_fall_seats) *
                  100
                ).toFixed(2)}
                %
              </p>
            </div>
          </div>
        </div>

        <div className="border border-[#8bcfcd] rounded-lg">
          <h2 className="rounded-t p-2 bg-[#8bcfcd] text-white">Spring {year}</h2>
          <div className="grid grid-cols-2 gap-10 p-4 bg-[#8bcfcd]/5">
            <div>
              <p>Total Seats Offered</p>
              <p className="font-semibold text-3xl">
                {reports.total_spring_seats.toLocaleString()}
              </p>
            </div>
            <div>
              <p>Total Enrollment</p>
              <p className="font-semibold text-3xl">
                {reports.total_spring_enrollment.toLocaleString()}
              </p>
            </div>
            <div>
              <p>WID Course Sections Offered</p>
              <p className="font-semibold text-3xl">
                {reports.total_spring_courses.toLocaleString()}
              </p>
            </div>
            <div>
              <p>Seat Occupancy Rate</p>
              <p className="font-semibold text-3xl">
                {(
                  (reports.total_spring_enrollment /
                    reports.total_spring_seats) *
                  100
                ).toFixed(2)}
                %
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentData;
