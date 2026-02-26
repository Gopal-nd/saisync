import axiosInstance from "@/lib/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// fetch all internships
export const useInternships = () => {
  return useQuery({
    queryKey: ["internships"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/students/activities/internship");
      return data.data;
    }
  });
};

// Fetch single Internship by ID
export const useInternship = (id: string) => {
  return useQuery({
    queryKey: ["internship", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/students/activities/internship/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};

// Create new Internship
export const useCreateInternship = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: any) => {
      const { data } = await axiosInstance.post("/api/students/activities/internship/new", form);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internships"] });
    }
  });
};

// Update existing Internship
export const useUpdateInternship = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: any) => {
      const { data } = await axiosInstance.put(`/api/students/activities/internship/edit/${id}`, form);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internship"] });
    }
  });
};

// Delete internship by ID
export const useDeleteInternship = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/api/students/activities/internship/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internships"] });
    }
  });
};
