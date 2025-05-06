import axiosInstance from "@/lib/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// fetch all nptel
export const useScholoerships = () => {
  return useQuery({
    queryKey: ["scholoerships"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/students/activities/scholoership");
      return data.data;
    }
  });
};

// Fetch single nptel by ID
export const useScholoership = (id: string) => {
  return useQuery({
    queryKey: ["scholoership", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/students/activities/scholoership/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};

// Create new nptel
export const useCreateScholoership= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: any) => {
      const { data } = await axiosInstance.post("/api/students/activities/scholoership/new", form);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scholoerships"] });
    }
  });
};

// Update existing nptel
export const useUpdateScholoership = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: any) => {
      const { data } = await axiosInstance.put(`/api/students/activities/scholoership/edit/${id}`, form);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scholoership"] });
    }
  });
};

// Delete nptel by ID
export const useDeleteScholoership = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/api/students/activities/scholoership/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scholoerships"] });
    }
  });
};
