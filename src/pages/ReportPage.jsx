import React, { useState } from "react";
import WeeklyReport from "../components/WeeklyReport";
import WeeklyReportChart from "../components/WeeklyReportChart";

const ReportPage = () => {

  const [uid, setUid] = useState(null)

  return (
    <div className="container mx-auto mt-10">
      <WeeklyReport uid={uid} setUid={setUid}/>

      <WeeklyReportChart uid={uid}/>
    </div>
  );
};

export default ReportPage;
