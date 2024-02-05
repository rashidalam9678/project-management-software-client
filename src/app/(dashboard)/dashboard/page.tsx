import ProjectCard from "@/components/project/ProjectCard"

const page = () => {
    const data = [1, 2, 34, 5, 6]
    return (
        <div className="p-4 flex items-center justify-center gap-6 flex-wrap">
            {data.map((item, index) => {
                return (
                    <>
                        <ProjectCard key={index} item={item} index={index}/>
                    </>
                )
            })}

        </div>
    )
}

export default page