"use client"
import {useAuth} from "@clerk/nextjs";
import { redirect } from 'next/navigation'
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";


export default function Home() {
  const { isSignedIn } = useAuth();
  // if user is signed in, redirect to dashboard 
  if (isSignedIn) {
    redirect('/dashboard')
  }

  return (
    <main className=" min-h-screen">
      <Navbar/>
      <Hero/>
    </main>
  );
}
