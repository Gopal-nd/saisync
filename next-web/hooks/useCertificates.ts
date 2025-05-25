import axiosInstance from "@/lib/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


export const useCertificates = () => {
  return useQuery({
    queryKey: ["certificates"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/students/activities/certificate");
      return data.data;
    }
  });
};

export const useCertificate = (id: string) => {
  return useQuery({
    queryKey: ["certificate", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/students/activities/certificate/${id}`);
      return data.data;
    },
    enabled: !!id
  });
};

export const useCreateCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: any) => {
      const { data } = await axiosInstance.post("/api/students/activities/certificate/new", form);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    }
  });
};

export const useUpdateCertificate = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: any) => {
      const { data } = await axiosInstance.put(`/api/students/activities/certificate/edit/${id}`, form);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificate"] });
    }
  });
};

export const useDeleteCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/api/students/activities/certificate/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    }
  });
};
