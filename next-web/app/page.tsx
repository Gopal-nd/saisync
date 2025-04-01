'use client'
import Logout from "@/components/Logout";
import { ModeToggle } from "@/components/ModeToggle";
import useAuthStore from "@/store/useAuthStore";
import Image from "next/image";

export default function Home() {
  const {token ,user} = useAuthStore()
  return (
    <div>

      <ModeToggle />
      {/* {token} */}
      {JSON.stringify(user)}
      <Logout />
      
    </div>
  );
}
