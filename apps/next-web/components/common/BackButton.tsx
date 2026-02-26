import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button';

interface BackButtonProps {
    label?:string;
    href?:string
}

const BackButton = ({label,href}:BackButtonProps) => {
  if(!label || !href){
    return
  }
  return (
    <Button
    variant={'link'}
    className='font-normal w-full'
    size={'sm'}
    asChild
    >
        <Link href={href}>{label}</Link>
    </Button>
  )
}

export default BackButton
