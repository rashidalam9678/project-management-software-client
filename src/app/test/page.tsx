"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useAuth } from '@clerk/nextjs'

export default function Page() {
  const { getToken } = useAuth()
  const [token,setToken]= useState<string | null>(null)
  async function handleUser(e: any) {
    setToken('loading...')
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:8080/api/v1/projects/8', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getToken()}`
        },
        body: JSON.stringify({ title:"updated project", description:"this is just created for testing"}),
      });

      if (response.ok) {
        const newProject = await response.json();
        console.log('User created:', newProject);
        setToken(JSON.stringify(newProject))
      } else {
        console.error('Error creating user:', response.statusText);
        // Handle error, e.g., display an error message to the user
        setToken(`Error creating user: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle error, e.g., display an error message to the user
      setToken(`Error creating user: ${error}`)
    }
  }
  return (
    <div className='flex flex-col m-4'>
      This is just to test the end point
      <br />
      <hr />
      <Button onClick={handleUser}>Insert Project</Button>
      <p className=' border-2 p-2 mt-4 w-full'>{token}</p>
    </div>
  )
}
