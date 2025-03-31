'use client'
import useAuthStore from '@/store/useAuthStore'
import React from 'react'

const Admin = () => {
    const {logout,token,user,isAuthenticated} = useAuthStore()
  return (
    <div>
        <p>Admin</p>
        <p>{JSON.stringify(token)}</p>
        <p>{JSON.stringify(user)}</p>
        <p>{isAuthenticated}</p>

    </div>
  )
}

export default Admin