"use client"
import { Button } from '@/components/ui/button'
import React from 'react'

export default function page() {
    async function handleUser(e:any) {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:8080/user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ external_id:"dfdfd34dfdf", email:"alamboy077@gmail.com" }),
            });
      
            if (response.ok) {
              const newUser = await response.json();
              console.log('User created:', newUser);
              // Handle successful creation, e.g., update UI or navigate to a different page
            } else {
              console.error('Error creating user:', response.statusText);
              // Handle error, e.g., display an error message to the user
            }
          } catch (error) {
            console.error('Error creating user:', error);
            // Handle error, e.g., display an error message to the user
          }
    }
  return (
    <div>
        This is just to test the end point

        <Button onClick={handleUser}>Insert User</Button>
    </div>
  )
}
