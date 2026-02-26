import axiosInstance from "@/lib/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


export const useEcosystems = () => {
  return useQuery({
    queryKey: ["ecosystems"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/students/activities/ecosystem");
      return data.data;
    }
  });
};

export const useEcosystem = (id: string) => {
  return useQuery({
    queryKey: ["ecosystem", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/students/activities/ecosystem/${id}`);
      return data.data;
    },
    enabled: !!id
  });
};

export const useCreatEcosystem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: any) => {
      const { data } = await axiosInstance.post("/api/students/activities/ecosystem/new", form);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ecosystems"] });
    }
  });
};

export const useUpdateEcosystem = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: any) => {
      const { data } = await axiosInstance.put(`/api/students/activities/ecosystem/edit/${id}`, form);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ecosystems"] });
    }
  });
};

export const useDeleteEcosystem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/api/students/activities/ecosystem/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ecosystems"] });
    }
  });
};
