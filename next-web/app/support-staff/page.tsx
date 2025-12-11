'use client'
import useAuthStore from '@/store/useAuthStore'
import React from 'react'

const SupportStaff = () => {
  const {user} = useAuthStore()
  return (
    <>
    <div>Welcome {user?.name}</div>
      <p>
      Your Role is Comming Soon
      </p>
    </>

  )
}

export default SupportStaff
