"use client"
import useSWR from 'swr'
import axios from 'axios'



async function fetcher([url, token]: [string, string|null]): Promise<any> {
    try {
        const res = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return res.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
}

function useProject (token:string|null) {
    const { data, error, isLoading } = useSWR([`${process.env.SERVER_URL}/projects`,token], fetcher)
   
    return {
      projects: data,
      isLoading,
      isError: error
    }
  }



export { useProject}