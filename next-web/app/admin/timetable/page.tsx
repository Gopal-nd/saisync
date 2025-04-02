"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

const branches = ["AIML", "ECE", "CSE", "EEE", "ISE", "MECH"];
const semesters = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"];

const TimeTablePage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [branch, setBranch] = useState("AIML");
  const [semester, setSemester] = useState("S6");

  // Fetch timetable data based on selections
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["timeTable", branch, semester, date],
    queryFn: async () => {
      try {
        const formattedDate = format(date, "yyyy-MM-dd");
        const response = await axiosInstance.get("/api/timetable", {
          params: { branch, semester, date: formattedDate },
        });
        return response.data;
      } catch (error) {
        toast.error("Failed to fetch timetable.");
        return [];
      }
    },
  });

  // Refetch when branch, semester, or date changes
  useEffect(() => {
    refetch();
  }, [branch, semester, date, refetch]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-row items-center justify-between mb-4">
        <p className="text-2xl font-bold">Select a Day</p>
      </div>

      {/* Branch, Semester, and Date Selection */}
      <div className="flex gap-4 mb-4">
        <Select onValueChange={setBranch} defaultValue="AIML">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            {branches.map((b) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setSemester} defaultValue="S6">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Semester" />
          </SelectTrigger>
          <SelectContent>
            {semesters.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-48 pl-3 text-left">
              {date ? format(date, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => setDate(date ?? new Date())}
              onDayClick={(date) => setDate(date ?? new Date())}
              
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

     <hr />
     <div className="flex justify-between items-center mt-2">
      <p className=" text-lg font font-bold ">Schedule for <span className="text-blue-500 ">{branch}</span>  <span className="text-blue-500 ">{semester}</span> on <span className="text-yellow-500">{date.toDateString()}</span>  </p>
      <Link
  href={{
    pathname: "/admin/timetable/add",
    query: {
      sem: semester,
      branch: branch,
      day: format(date, "yyyy-MM-dd"), 
    },
  }}>
    <Button variant={'outline'}><Plus/>Add</Button>
    </Link>
     </div>
       {/* Timetable Table */}
       {isLoading ? (
        <p className="mt-2">Loading...</p>
      ) : data && data.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Professor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{item.time}</TableCell>
                <TableCell>{item.subject}</TableCell>
                <TableCell>{item.professor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500">No timetable available.</p>
      )}

    </div>
  );
};

export default TimeTablePage;
