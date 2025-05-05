import axiosInstance from "@/lib/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// fetch all nptel
export const useAchivements = () => {
  return useQuery({
    queryKey: ["achivements"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/students/activities/achivements");
      return data.data;
    }
  });
};

// Fetch single nptel by ID
export const useAchivement = (id: string) => {
  return useQuery({
    queryKey: ["achivement", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/students/activities/achivements/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};

// Create new nptel
export const useCreateAchivement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: any) => {
      const { data } = await axiosInstance.post("/api/students/activities/achivements/new", form);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achivements"] });
    }
  });
};

// Update existing nptel
export const useUpdateAchivement = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: any) => {
      const { data } = await axiosInstance.put(`/api/students/activities/achivements/edit/${id}`, form);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achivements"] });
    }
  });
};

// Delete nptel by ID
export const useDeleteAchivement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/api/students/activities/achivements/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achivements"] });
    }
  });
};
