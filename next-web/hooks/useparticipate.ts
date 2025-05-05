import axiosInstance from "@/lib/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// fetch all nptel
export const useParticipates = () => {
  return useQuery({
    queryKey: ["participates"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/students/activities/participate");
      return data.data;
    }
  });
};

// Fetch single nptel by ID
export const useParticipate = (id: string) => {
  return useQuery({
    queryKey: ["participate", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/students/activities/participate/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};

// Create new nptel
export const useCreateParticipate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: any) => {
      const { data } = await axiosInstance.post("/api/students/activities/participate/new", form);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participates"] });
    }
  });
};

// Update existing nptel
export const useUpdateParticipate = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: any) => {
      const { data } = await axiosInstance.put(`/api/students/activities/participate/edit/${id}`, form);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participate"] });
    }
  });
};

// Delete nptel by ID
export const useDeleteParticipate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/api/students/activities/participate/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participates"] });
    }
  });
};
