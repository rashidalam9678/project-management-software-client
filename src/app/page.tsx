"use client"
import Link from "next/link";
import {useAuth} from "@clerk/nextjs";
import { redirect } from 'next/navigation'


export default function Home() {
  const { isSignedIn } = useAuth();
  // if user is signed in, redirect to dashboard 
  if (isSignedIn) {
    redirect('/dashboard')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div>
      <h1 className="text-3xl border-l-destructive">Hey, Welcome to the ProjectX</h1>
      <h3>Make your life easy while working on projects</h3>
      <Link className="underline text-blue-400" href='/sign-in'>Sign In</Link>
    </div>
    </main>
  );
}
