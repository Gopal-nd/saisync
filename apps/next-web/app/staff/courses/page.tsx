'use client';

import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/lib/axiosInstance';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { debounce } from 'lodash';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const fetchSubjects = async (query: string, page: number) => {
  const response = await axiosInstance.get('/api/subjects/search', {
    params: { query, page, limit: 10 },
  });
  return response.data;
};

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const debouncedSearch = debounce((value: string) => {
    setSearchTerm(value);
  }, 700);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['subjects', searchTerm, page],
    queryFn: () => fetchSubjects(searchTerm, page),
  });

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/api/subjects/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      refetch();
    },
    onError: (error) => {
      console.error('Error deleting subject:', error);
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <motion.div
        className="text-center space-y-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold tracking-tight">
          Find Your Subjects
        </h1>
        <p className="text-muted-foreground">
          Explore a wide range of subjects and Master them
        </p>
      </motion.div>

      <motion.div
        className="w-full max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Input
          placeholder="Search by Subject Name or Code..."
          onChange={(e) => debouncedSearch(e.target.value)}
          className="h-12 text-lg px-5"
        />
      </motion.div>

      {isLoading ? (
        <p className="text-center text-lg font-medium">Loading...</p>
      ) : data?.data?.subjects.length === 0 ? (
        <p className="text-center text-lg font-medium">No results found.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {data?.data?.subjects.map((subject: any) => (
            <motion.div
              key={subject.id}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card
                onClick={() => redirect(`/staff/courses/${subject.id}`)}
                className="cursor-pointer rounded-2xl border shadow-sm transition-all hover:shadow-lg hover:scale-[1.01]"
              >
                <CardContent className="p-6 space-y-2">
                  <h2 className="text-xl font-semibold">{subject.subjectName}</h2>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p><span className="font-medium text-foreground">Code:</span> {subject.subjectCode}</p>
                    <p><span className="font-medium text-foreground">Exam Type:</span> {subject.examType}</p>
                    <p><span className="font-medium text-foreground">Is Lab:</span> {subject.isLab ? 'Yes' : 'No'}</p>
                    <p><span className="font-medium text-foreground">Credits:</span> {subject.noOfCredits}</p>
                    <p><span className="font-medium text-foreground">Scheme:</span> {subject.year}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div
        className="flex items-center justify-center gap-6 pt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          variant="outline"
        >
          Previous
        </Button>
        <span className="text-lg font-medium">
          Page {page} of {data?.data?.totalPages || 1}
        </span>
        <Button
          onClick={() => setPage((p) => p + 1)}
          disabled={data?.data?.subjects.length < 10}
        >
          Next
        </Button>
      </motion.div>
    </div>
  );
};

export default SearchPage;
