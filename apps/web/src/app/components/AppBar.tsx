"use client"
import { signOut, useSession } from "next-auth/react"

export default function AppBar() {
    const { data: session, status } = useSession() 
    console.log(session, 'data')
  return (
    <nav className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
      <div className="font-bold text-xl">Exchange</div>
      <div className="flex items-center space-x-2">
        {session?.user && <span>Hello, {session.user.email}</span>}
   <button onClick={()=>signOut()} className="px-2 py-1 bg-red-500 hover:bg-red-700 text-white rounded">Logout</button>
      </div>
    </nav>
  );
};

