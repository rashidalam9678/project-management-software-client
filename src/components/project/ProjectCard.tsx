import Link from "next/link"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
export default function ProjectCard({item}: any) {
    return (
        <>
            <Link className="" href={`/projects/${item.ID}`} >
                <Card className="w-[280px] h-[300px] rounded-xl hover:scale-105 transition ease-in-out delay-100">
                    <CardHeader className="h-[140px] text-white bg-blue-700 rounded-t-xl flex justify-center items-center">
                        <CardTitle >{item.Title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 text-sm">
                        <p className="font-semibold pb-3">{item.Title}</p>
                        <p >{item.Description}</p>
                        <p className="text-[12px] text-blue-700">last updated: january 5 20224</p>
                    </CardContent>
                    <CardFooter className="pl-2 pt-4 pb-3 ">
                        <Badge>Shared</Badge>
                    </CardFooter>
                </Card>
            </Link>
        </>
    )
}