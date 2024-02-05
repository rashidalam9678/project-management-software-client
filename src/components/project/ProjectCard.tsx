import Link from "next/link"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
export default function ProjectCard({item, index}: any) {
    return (
        <>
            <Link key={index} className="" href={`/projects/${item}`} >
                <Card className="w-[300px] rounded-xl hover:scale-105 transition ease-in-out delay-150">
                    <CardHeader className="h-[150px] text-white bg-blue-700 rounded-t-xl flex justify-center items-center">
                        <CardTitle >My first project</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 text-sm">
                        <p className="font-semibold pb-3">my first project</p>
                        <p >This is the first prroject craeated for the test purpose by Mohd Rashid</p>
                        <p className="text-[12px] text-blue-700">last updated: january 5 20224</p>
                    </CardContent>
                    <CardFooter className="pl-2 pt-4 pb-3">
                        <Badge>Shared</Badge>
                    </CardFooter>
                </Card>
            </Link>
        </>
    )
}