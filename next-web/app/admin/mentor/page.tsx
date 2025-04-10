"use client";
import { useState, useEffect } from "react";
import { dataTagErrorSymbol, useMutation, useQuery } from "@tanstack/react-query";
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
const periods = ['1', '2', '3', '4', '5', '6', '7', '8']

const MentorPage = () => {
  const [branch, setBranch] = useState('AIML');
  const [semester, setSemester] = useState("S6");
  const [section, setSection] = useState("A");

  const [selectMode, setSelectMode] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedStaff, setSelectedStaff] = useState("");

  // Fetch timetable data based on selections
  const { data: mentorDetails, isLoading, refetch } = useQuery({
    queryKey: ["timeTable", branch, semester, section],
    queryFn: async () => {
      try {

        const response = await axiosInstance.get("/api/mentor", {
          params: { branch, semester, section },
        });
        return response.data.data;
      } catch (error) {
        toast.error(" Time Table not Found.");
        return [];
      }
    },
  });

  console.log(mentorDetails)

  // Refetch when branch, semester, or date changes
  useEffect(() => {
    refetch();
  }, [branch, semester, section, refetch]);





  //   console.log(mentorDetails)
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


  const toggleStudentSelection = (usn: string) => {
    setSelectedStudents((prev) =>
      prev.includes(usn) ? prev.filter((u) => u !== usn) : [...prev, usn]
    );
  };

  const assignMentorMutation = useMutation({
    mutationFn: async () => {
      console.log({
        studentUsns: selectedStudents,
        mentorUsn: selectedStaff,
      })
      const res = await axiosInstance.post("/api/mentor/assign", {
        studentUsns: selectedStudents,
        mentorId: selectedStaff,
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      setSelectedStudents([]);
      refetch();
    },
    onError: () => {
      toast.error("Failed to assign mentor.");
    },
  });


  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-row items-center justify-between mb-4">
        <p className="text-2xl font-bold">Select mentorDetails</p>
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

        <Select onValueChange={setSemester} defaultValue="S6" >
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
        <Select onValueChange={setSection} defaultValue="A">
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
      </div>

      <hr />
      <div className="flex justify-between items-center m-4">
        <p className=" text-lg font font-bold ">Mentor for <span className="text-blue-500 ">{branch}</span>  <span className="text-blue-500 ">{semester}</span> <span className="text-green-500">{section}</span>  </p>
        <Button onClick={() => setSelectMode(!selectMode)} variant="outline">
          {selectMode ? "Cancel Selection" : "Assign Mentor"}
        </Button>
        {selectMode && (
          <div className="flex gap-4 mt-4 items-center">
            <select
              className="bg-input px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-primary/50"
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
            >
              <option value="" className='bg-gray-900'>Choose Mentor</option>
              {mentorDetails?.staff?.map((s: any) => (
                <option className='bg-gray-900' key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <Button
              disabled={selectedStudents.length === 0 || !selectedStaff}
              onClick={() => assignMentorMutation.mutate()}
            >
              Assign Mentor
            </Button>
          </div>
        )}

        <div className="flex items-center gap-2">

        </div>
      </div>
      {/* Timetable Table */}
      {isLoading ? (
        <p className="mt-2">Loading...</p>
      ) : mentorDetails && mentorDetails?.students?.length > 0 ? (

        <div className="flex  justify-center">

          <Table>
            <TableHeader>
              <TableRow>
                {selectMode && <TableHead>Select</TableHead>}
                <TableHead>USN</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Mentor</TableHead>
              </TableRow>
            </TableHeader>
     

              <TableBody>
                {mentorDetails?.students?.map((student: any, index: number) => (
                  <TableRow key={index}>
                    {selectMode && (
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.usn)}
                          onChange={() => toggleStudentSelection(student.usn)}
                        />
                      </TableCell>
                    )}
                    <TableCell>{student.usn}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student?.mentor?.name ?? " - "}</TableCell>



                  </TableRow>
                ))}
              </TableBody>
          </Table>
        </div>

      ) : (
        <p className="text-center text-gray-500">No Mentor available.</p>
      )}

    </div>
  );
};

export default MentorPage;
