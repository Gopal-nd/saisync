"use client";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { CalendarIcon, Edit, Plus, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { redirect } from "next/navigation";
import CSVDownload from "@/components/CSVDownload";
import ExportPDF from "@/components/PDFDownloader";


const branches = ["AIML", "ECE", "CSE", "EEE", "ISE", "MECH"];
const semesters = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"];
const sections = ["A", "B", "C", "D", "E", "F", "G", "H"];
const periods = ['1','2','3','4','5','6','7','8']

const Attendence = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [branch, setBranch] = useState('AIML');
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [period, setPriod] = useState('')

  // Fetch timetable data based on selections
  const { data:attendence, isLoading, refetch } = useQuery({
    queryKey: ["timeTable", branch, semester,section, date],
    queryFn: async () => {
      try {
        const formattedDate = format(date, "yyyy-MM-dd");
        const response = await axiosInstance.get("/api/attendence", {
          params: { branch, semester, date: formattedDate,section,period},
        });
        return response.data.data;
      } catch (error) {
        toast.error(" Time Table not Found.");
        return [];
      }
    },
  });

  // Refetch when branch, semester, or date changes
  useEffect(() => {
    refetch();
  }, [branch, semester, date,period, section, refetch]);

//   console.log(attendence)
// const mutate = useMutation({
//     mutationFn: async (id: string) => {
//         const res = await axiosInstance.delete(`/api/schedule/delete/${id}`);
//         return res.data;
//       },
//       onSuccess: (data) => {
//         console.log(data)
//         toast.success(data?.message)
//         refetch()
//         // queryClient.invalidateQueries(['subjects', searchTerm, branch, semester, page]); 



//       },
//       onError: (error) => {
//         console.error("Error deleting subject:", error);
//       },
//   })

//   const handleEdit = async (id:string)=>{
//     console.log(id)
//     redirect(`/admin/timetable/${id}/edit`)


//   }

//   const handleDelete = async (id:string)=>{
//     console.log(id)
//     mutate.mutate(id)
//   }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-row items-center justify-between mb-4">
        <p className="text-2xl font-bold">Select Attendence</p>
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

        <Select onValueChange={setSemester} >
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
        <Select onValueChange={setSection} >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Section" />
          </SelectTrigger>
          <SelectContent>
            {sections.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setPriod} >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Period" />
          </SelectTrigger>
          <SelectContent>
            {periods.map((s) => (
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
     <div className="flex justify-between items-center m-4">
      <p className=" text-lg font font-bold ">Attendence for <span className="text-blue-500 ">{branch}</span>  <span className="text-blue-500 ">{semester}</span> <span className="text-green-500">{section}</span> on <span className="text-yellow-500">{date.toDateString()}</span>  </p>
      <div className="flex items-center gap-2">
            <CSVDownload attendence={attendence ?? []} />
            <ExportPDF attendanceData={attendence??[]}/>

            </div>
     </div>
       {/* Timetable Table */}
       {isLoading ? (
        <p className="mt-2">Loading...</p>
      ) : attendence && attendence?.length > 0 ? (

        <div className="flex  justify-center">
          
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead>USN</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {attendence.map((entry:any, index:number) => (
            <TableRow key={index}>
              <TableCell>{entry.user.usn}</TableCell>
              <TableCell>{entry.user.name}</TableCell>
              <TableCell>{entry.periodNumber}</TableCell>
              <TableCell>{entry.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>

      ) : (
        <p className="text-center text-gray-500">No Attendence available.</p>
      )}

    </div>
  );
};

export default Attendence;
