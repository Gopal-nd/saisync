'use client'
import { FC } from 'react'

import {Avatar, AvatarFallback} from '../ui/avatar'
import React from 'react'
import Image from 'next/image'

import { AvatarProps } from '@radix-ui/react-avatar'
import { Wheat } from 'lucide-react'
import { User } from '@/store/useAuthStore'
interface UserAvatarPropsProps extends AvatarProps{
  user : Pick<User,'name'|'image'>
}


const UserAvatarProps: FC<UserAvatarPropsProps> = ({user,...props}) => {
  return(

      <Avatar {...props}>
   {user.image ? (
    <div className='relative aspect-square h-full w-full'>
        <Image src={user.image} fill referrerPolicy='no-referrer' alt='profile picture'/>
    </div>
   ):(
    <AvatarFallback>
        <span className='sr-only'>{user?.name}</span>
        <Wheat className='h-4 w-4' />
        </AvatarFallback>
   )}
  </Avatar>
)
}

export default UserAvatarProps
