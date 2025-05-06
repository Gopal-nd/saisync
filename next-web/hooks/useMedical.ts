import axiosInstance from "@/lib/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// fetch all nptel
export const useMedicals = () => {
  return useQuery({
    queryKey: ["medicals"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/students/activities/medical");
      return data.data;
    }
  });
};

// Fetch single nptel by ID
export const useMedical = (id: string) => {
  return useQuery({
    queryKey: ["medical", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/students/activities/medical/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};

// Create new nptel
export const useCreateMedical= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: any) => {
      const { data } = await axiosInstance.post("/api/students/activities/medical/new", form);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicals"] });
    }
  });
};

// Update existing nptel
export const useUpdateMedical = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: any) => {
      const { data } = await axiosInstance.put(`/api/students/activities/medical/edit/${id}`, form);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medical"] });
    }
  });
};

// Delete nptel by ID
export const useDeleteMedical = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/api/students/activities/medical/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicals"] });
    }
  });
};
