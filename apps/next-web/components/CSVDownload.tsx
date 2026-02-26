import { Button } from "@/components/ui/button";
import Papa from "papaparse";
import { FaFileExcel } from "react-icons/fa";
import React from "react";

interface CSVDownloadProps {
  attendence: any[];
}

export default function CSVDownload({ attendence }: CSVDownloadProps) {
  const handleDownloadCSV = () => {
    const csv = Papa.unparse(
      attendence.map((entry) => ({
        USN: entry.user.usn,
        Name: entry.user.name,
        Period: entry.periodNumber,
        Status: entry.status,
      }))
    );

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "attendance.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button onClick={handleDownloadCSV} variant={'outline'}>
      <FaFileExcel className="mr-2" />
      Export CSV
    </Button>
  );
}
