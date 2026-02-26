import axiosInstance from "@/lib/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Fetch all experiences
export const useExperiences = () => {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/students/activities/exp-trip");
      return data.data;
    }
  });
};

// Fetch single experience by ID
export const useExperience = (id: string) => {
  return useQuery({
    queryKey: ["experience", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/students/activities/exp-trip/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};

// Create new experience
export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: any) => {
      const { data } = await axiosInstance.post("/api/students/activities/exp-trip/new", form);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    }
  });
};

// Update existing experience
export const useUpdateExperience = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: any) => {
      const { data } = await axiosInstance.put(`/api/students/activities/exp-trip/edit/${id}`, form);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    }
  });
};

// Delete experience by ID
export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/api/students/activities/exp-trip/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    }
  });
};
