'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axiosInstance from '@/lib/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'

const Attendance = () => {
  const [date, setDate] = useState({
    startDate:new Date(),
    endDate:new Date(),
  })
  const mutate = useMutation({
    mutationFn:async(date:{
    startDate: Date;
    endDate: Date;
})=>{
      const res = await axiosInstance.post('/api/student',date)
      console.log(res.data)
      return res.data
    }
  })
  const handelSubmit = ()=>{
    if(!date.endDate || date.startDate){
      return
    }
    mutate.mutate(date)
  }
  return (
    <div>
      <h1>Attendance</h1>
      <div>
        <Input type='date' value={date.startDate as any} onChange={(e)=>setDate({...date,startDate:new Date(e.target.value!)})} name='startDate'/>
        <Input type='date'  value={date.endDate as any} onChange={(e)=>setDate({...date,endDate:new Date(e.target.value!)})} name='endDate'/>
        <Button onClick={handelSubmit}>Submit</Button>
      </div>
    </div>
  )
}

export default Attendance