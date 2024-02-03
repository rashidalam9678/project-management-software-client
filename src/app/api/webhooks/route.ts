import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
 
export async function POST(req: Request) {
 
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
 
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }
 
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");
 
  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }
 
  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);
 
  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);
 
  let evt: WebhookEvent
 
  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }
 
  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;
  const da=JSON.parse(body)

  switch(eventType){
    case 'user.created':
      console.log("user created")
      console.log('Webhook body email:', da.data.email_addresses[0].email_address)

      try {
        const response = await fetch('http://localhost:8080/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ external_id:id, email: da.data.email_addresses[0].email_address}),
        });
  
        if (response.ok) {
          const newUser = await response.json();
          console.log('User created:', newUser);
          // Handle successful creation, e.g., update UI or navigate to a different page
        } else {
          console.error('Error creating user:', response.statusText);
          // Handle error, e.g., display an error message to the user
          new Response('Error occured while creating the user in SQL database', {
            status: 400
          })
        }
      } catch (error) {
        console.error('Error creating user:', error);
        // Handle error, e.g., display an error message to the user
        new Response('Backend endpoint not reachable', {
          status: 400
        })
      }
      break;
    case 'user.updated':
      console.log("user updated")
      console.log(payload)
      break;
    case 'user.deleted':
      console.log("user deleted")
      console.log(payload)
      break;
  
  }
  
  
 
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
  
 
  return new Response('', { status: 200 })
}
 