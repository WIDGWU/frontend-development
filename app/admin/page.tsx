"use client";
import GraphsForFiveYear from "../local-components/HomePage/ThirdSection/GraphsForFiveYear";
import GraphsForTerm from "../local-components/HomePage/SecondSection/GraphsForTerm";
import GraphsForYear from "../local-components/HomePage/FirstSection/GraphsForYear";
import { getnginxReports } from "../api/reports";
import { useState, useEffect } from "react";
// Home Page for Admin
const AdminPage = () => {
  const [reports, setReports] = useState([]);
  useEffect(() => {
    getnginxReports(2024).then((res) => {
      setReports(res);
    });
  }, []);

  console.log("Nginx Reports", reports);
  return (
    <main className="m-4">
      {/* Three graphs are shown, graphs for year, individual term and for five year long period */}
      <GraphsForYear />
      <GraphsForTerm />
      <GraphsForFiveYear />
    </main>
  );
};

export default AdminPage;
