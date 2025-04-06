'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { studentFormSchema, StudentFormType } from '@/schema/students';
import axiosInstance from '@/lib/axiosInstance';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useQueryClient } from '@tanstack/react-query';


export default function UserPersonalDetails({ id }: { id: string }) {
    const queryClient = useQueryClient();

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['studentPersonalDetails', id],
        queryFn: async () => {
          const res = await axiosInstance.get('/api/students/personal', {
            params: { id },
          });
          return res.data.data;
        },
      });
      

   
  const form = useForm<StudentFormType>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
        dob: data?.dob ? format(new Date(data?.dob), 'yyyy-MM-dd') : '',
        phone: data?.phone ?? '',
        gender: data?.gender ?? '',
        bloodGroup: data?.bloodGroup ?? '',
        height: data?.height ?? '',
        weight: data?.weight ?? '',
        maritalStatus: data?.maritalStatus ?? '',
        nationality: data?.nationality ?? '',
        aadharNumber: data?.aadharNumber ?? '',
        panNumber: data?.panNumber ?? '',
        permanentAddress: data?.permanentAddress ?? '',
        permanentCity: data?.permanentCity ?? '',
        permanentState: data?.permanentState ?? '',
        permanentPincode: data?.permanentPincode ?? '',
        currentAddress: data?.currentAddress ?? '',
        currentCity: data?.currentCity ?? '',
        currentState: data?.currentState ?? '',
        currentPincode: data?.currentPincode ?? '',
    },
  });



  useEffect(() => {
    if (data) {
      // Format the data for form reset
      const formattedData = {
        dob: data?.dob ? format(new Date(data?.dob), 'yyyy-MM-dd') : '',
        phone: data?.phone ?? '',
        gender: data?.gender ?? '',
        bloodGroup: data?.bloodGroup ?? '',
        height: data?.height ?? '',
        weight: data?.weight ?? '',
        maritalStatus: data?.maritalStatus ?? '',
        nationality: data?.nationality ?? '',
        aadharNumber: data?.aadharNumber ?? '',
        panNumber: data?.panNumber ?? '',
        permanentAddress: data?.permanentAddress ?? '',
        permanentCity: data?.permanentCity ?? '',
        permanentState: data?.permanentState ?? '',
        permanentPincode: data?.permanentPincode ?? '',
        currentAddress: data?.currentAddress ?? '',
        currentCity: data?.currentCity ?? '',
        currentState: data?.currentState ?? '',
        currentPincode: data?.currentPincode ?? '',
      };
      
      // Use setValue for each field to ensure Select components update properly
      Object.entries(formattedData).forEach(([key, value]) => {
        form.setValue(key as keyof StudentFormType, value, {
          shouldDirty: false,
          shouldValidate: true,
        });
      });
    }
  }, [data, form]);

  const mutation = useMutation({
    mutationFn: async (formData: StudentFormType) => {
      const res = await axiosInstance.put('/api/students/personal', {
        ...formData,
        id,
      });
      return res.data;
    },
    onSuccess: (response) => {
      toast.success(response?.message || 'Updated successfully');
      queryClient.invalidateQueries({ queryKey: ['studentPersonalDetails', id] });
      
      refetch();
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Something went wrong');
    },
  });

  const {
    handleSubmit,
    formState: { isDirty },
  } = form;

  if (isLoading) return <div className="text-center py-4">Loading...</div>;

  return (

    <>
    {!!data ? (
           <Form {...form}>
           <form
             onSubmit={handleSubmit((data) => mutation.mutate(data))}
             className="space-y-4 max-w-2xl mx-auto p-4"
           >
             <h2 className="text-2xl font-semibold text-center mb-4">
               Student Personal Details
             </h2>
     
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <FormField
                 control={form.control}
                 name="dob"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Date of Birth</FormLabel>
                     <FormControl>
                       <Input type="date" {...field} />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
     
               <FormField
                 control={form.control}
                 name="phone"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Phone</FormLabel>
                     <FormControl>
                       <Input placeholder="Phone" {...field} />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
     
               <FormField
                 control={form.control}
                 name="gender"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Gender</FormLabel>
                     <FormControl>
                       <select
                                        className="bg-input px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-primary/50"
                          {...field}
                       >
                         <option className='bg-gray-900' value="">Select Gender</option>
                         {['Male', 'Female', 'Other'].map((s) => (
                           <option className='bg-gray-900' key={s} value={s}>
                             {s}
                           </option>
                         ))}
                       </select>
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
               
     
              <FormField
                 control={form.control}
                 name="maritalStatus"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Marital Status</FormLabel>
                     <FormControl>
                       <select
                         className="bg-input px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-primary/50"
                         {...field}
                       >
                         <option value="" className='bg-gray-900'>Select Marital Status</option>
                         {['Married', 'Unmarried', 'Divorced', 'Widowed'].map((s) => (
                              <option className='bg-gray-900' key={s} value={s}>
                              {s}
                            </option>
                         ))}
                       </select>
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
     


               {[
                 'bloodGroup',
                 'height',
                 'weight',
                 'nationality',
                 'aadharNumber',
                 'panNumber',
               ].map((name) => (
                 <FormField
                   key={name}
                   control={form.control}
                   name={name as keyof StudentFormType}
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>{name}</FormLabel>
                       <FormControl>
                         <Input placeholder={name} {...field} />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
               ))}
             </div>
     
             <h3 className="font-medium mt-6">Permanent Address</h3>
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       {['permanentAddress', 'permanentCity', 'permanentState', 'permanentPincode'].map(
         (name) => (
           <FormField
             key={name}
             control={form.control}
             name={name as keyof StudentFormType}
             render={({ field }) => (
               <FormItem>
                 <FormLabel>
                   {name.replace(/^permanent/, '').replace(/([A-Z])/g, ' $1').trim()}
                 </FormLabel>
                 <FormControl>
                   {name === 'permanentAddress' ? (
                     <Textarea placeholder="Enter address" {...field} />
                   ) : (
                     <Input placeholder={`Enter ${name}`} {...field} />
                   )}
                 </FormControl>
                 <FormMessage />
               </FormItem>
             )}
           />
         )
       )}
     </div>
     
     <h3 className="font-medium mt-6">Current Address</h3>
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       {['currentAddress', 'currentCity', 'currentState', 'currentPincode'].map(
         (name) => (
           <FormField
             key={name}
             control={form.control}
             name={name as keyof StudentFormType}
             render={({ field }) => (
               <FormItem>
                 <FormLabel>
                   {name.replace(/^current/, '').replace(/([A-Z])/g, ' $1').trim()}
                 </FormLabel>
                 <FormControl>
                   {name === 'currentAddress' ? (
                     <Textarea placeholder="Enter address" {...field} />
                   ) : (
                     <Input placeholder={`Enter ${name}`} {...field} />
                   )}
                 </FormControl>
                 <FormMessage />
               </FormItem>
             )}
           />
         )
       )}
     </div>
     
             <Button
               type="submit"
               className="mt-6 w-full"
               disabled={ !form.formState.isDirty}
             >
               {mutation.isPending ? 'Submitting...' : 'Submit'}
             </Button>
           </form>
         </Form>
    ):<div>Loading</div>}
 
    </>

  );
}