// pages/api/createUser.ts
import axios from 'axios';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { external_id, email } = req.body;

    // Perform any necessary validation or processing
    if (!external_id || !email) {
      return res.status(400).json({ error: 'External ID and email are required' });
    }

    const response = await axios.post('https://api.example.com/v1/users', {}, {
        headers: {
            'Authorization': `Bearer ${process.env.EXAMPLE_API_KEY}`,
        },
        data: {
            external_id,
            email,
        },
        });
    const newUser = response.data;

    

    
    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
