import CreateProjectDialog from "@/components/project/CreateProjectDialog"
import ProjectCard from "@/components/project/ProjectCard"
import { auth } from "@clerk/nextjs"
import axios from "axios"


async function getProjects(token: string | null) {
    try {
        const res = await axios.get(`${process.env.SERVER_URL}/projects`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.status == 200) {
            return res.data
        }
    } catch (error) {

    }
}

export default async function Dashboard() {
    const { getToken } = auth();
    const projects = await getProjects(await getToken())

    return (
        <div className="flex items-center flex-col ">
            <div className="flex items-center justify-end md:justify-between w-full p-2 px-8 md:px-16  border-b-2">
                <h1 className="text-xl font-semibold hidden md:block">My Projects</h1>
                <CreateProjectDialog />
            </div>


            <div className="flex gap-6 flex-wrap justify-center items-center mt-8">
                {projects?.data.map((item: any, index: number) => {
                    return (
                        <ProjectCard key={index} item={item} />
                    )
                })}
            </div>
        </div>
    )
}

