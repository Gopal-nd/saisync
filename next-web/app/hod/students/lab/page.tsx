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



const branches = ["AIML", "ECE", "CSE", "EEE", "ISE", "MECH"];
const semesters = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"];
const sections = ["A", "B", "C", "D", "E", "F", "G", "H"];


const MentorPage = () => {
  const [branch, setBranch] = useState('AIML');
  const [semester, setSemester] = useState("S6");
  const [section, setSection] = useState("A");

  const [selectMode, setSelectMode] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [labBatch, seLabBatch] = useState("");

  // Fetch timetable data based on selections
  const { data: studentDetails, isLoading, refetch } = useQuery({
    queryKey: ["students", branch, semester, section],
    queryFn: async () => {
      try {

        const response = await axiosInstance.get("/api/students/lab", {
          params: { branch, semester, section },
        });
        return response.data.data
      } catch (error) {
        toast.error(" Time Table not Found.");
        return [];
      }
    },
  });

  console.log(studentDetails)

  // Refetch when branch, semester, or date changes
  useEffect(() => {
    refetch();
  }, [branch, semester, section, refetch]);



  const toggleStudentSelection = (usn: string) => {
    setSelectedStudents((prev) =>
      prev.includes(usn) ? prev.filter((u) => u !== usn) : [...prev, usn]
    );
  };

  const assignMentorMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post("/api/students/lab/assign", {
        studentUsns: selectedStudents,
        batchNo: labBatch,
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
        <p className="text-2xl font-bold">Create The Lab Batches</p>
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
        <p className=" text-lg font font-bold ">Lab Batch no for <span className="text-blue-500 ">{branch}</span>  <span className="text-blue-500 ">{semester}</span> <span className="text-green-500">{section}</span>  </p>
        <Button onClick={() => setSelectMode(!selectMode)} variant="outline">
          {selectMode ? "Cancel Selection" : "  Assign Batch No"}
        </Button>
        {selectMode && (
          <div className="flex gap-4 mt-4 items-center">
            <select
              className="bg-input px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-primary/50"
              value={labBatch}
              onChange={(e) => seLabBatch(e.target.value)}
            >
              <option value="" className='bg-gray-900'>Choose Batch</option>
              {["B1","B2","B3"].map((s: any,index:number) => (
                <option className='bg-gray-900' key={index} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <Button
              disabled={selectedStudents.length === 0 || !labBatch}
              onClick={() => assignMentorMutation.mutate()}
            >
              Assign Batch No
            </Button>
          </div>
        )}

        <div className="flex items-center gap-2">

        </div>
      </div>
      {/* Timetable Table */}
      {isLoading ? (
        <p className="mt-2">Loading...</p>
      ) : studentDetails && studentDetails?.length > 0 ? (

        <div className="flex  justify-center">

          <Table>
            <TableHeader>
              <TableRow>
                {selectMode && <TableHead>Select</TableHead>}
                <TableHead>USN</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Batch</TableHead>
              </TableRow>
            </TableHeader>
     

              <TableBody>
                {studentDetails?.map((student: any, index: number) => (
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
                    <TableCell>{student?.labBatch ?? " - "}</TableCell>



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
