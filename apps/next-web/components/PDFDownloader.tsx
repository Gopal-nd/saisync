
import { Button } from "@/components/ui/button";
import { FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React from "react";

interface AttendanceEntry {
  user: {
    name: string;
    usn: string;
  };
  periodNumber: number;
  status: string;
}

interface Props {
  attendanceData: AttendanceEntry[];
  filters?: {
    date?: string;
    branch?: string;
    section?: string;
    period?: number;
  };
}

export default function ExportPDF({ attendanceData, filters }: Props) {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Attendance Report", 14, 20);

    // Display filters
    if (filters) {
      doc.setFontSize(10);
      const filterLines = Object.entries(filters)
        .filter(([_, v]) => v !== undefined && v !== "")
        .map(([k, v]) => `${k.charAt(0).toUpperCase() + k.slice(1)}: ${v}`);
      doc.text(filterLines.join(" | "), 14, 28);
    }

    // Table Headers & Body
    const headers = [["USN", "Name", "Period", "Status"]];
    const rows = attendanceData.map((entry) => [
      entry.user.usn,
      entry.user.name,
      String(entry.periodNumber),
      entry.status,
    ]);

    autoTable(doc, {
      head: headers,
      body: rows,
      startY: 35,
      styles: {
        fontSize: 10,
        cellPadding: 4,
      },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
      margin: { left: 14, right: 14 },
    });

    // File name with filters
    const fileName = `attendance-${filters?.branch || "all"}-${filters?.date || "all"}.pdf`;

    doc.save(fileName);
  };

  return (
    <Button variant="outline" onClick={handleDownloadPDF}>
      <FaFilePdf className="mr-2" />
      Export PDF
    </Button>
  );
}
