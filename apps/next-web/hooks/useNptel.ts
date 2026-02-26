import axiosInstance from "@/lib/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// fetch all nptel
export const useNptels = () => {
  return useQuery({
    queryKey: ["nptels"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/students/activities/nptel");
      return data.data;
    }
  });
};

// Fetch single nptel by ID
export const useNptel = (id: string) => {
  return useQuery({
    queryKey: ["nptel", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/students/activities/nptel/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};

// Create new nptel
export const useCreateNptel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: any) => {
      const { data } = await axiosInstance.post("/api/students/activities/nptel/new", form);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nptels"] });
    }
  });
};

// Update existing nptel
export const useUpdateNptel = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: any) => {
      const { data } = await axiosInstance.put(`/api/students/activities/nptel/edit/${id}`, form);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nptel"] });
    }
  });
};

// Delete nptel by ID
export const useDeleteNptel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/api/students/activities/nptel/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nptels"] });
    }
  });
};
