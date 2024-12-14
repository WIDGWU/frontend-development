"use client";
import { useState, useEffect } from "react";
import { getReports } from "./api/reports";
export default function Home() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getReports().then((data) => setReports(data));
  }, []);
  console.log("reports", reports);
  return (
    <div className="m-4">
      <h1>Home Page</h1>
    </div>
  );
}
