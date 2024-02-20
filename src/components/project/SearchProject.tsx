"use client"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"


export default function SearchProject() {
    return (
        <div className="relative  w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
            <Input
                type="text"
                placeholder="Search Projects..."
                className="pl-10 pr-3 py-2 text-md w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6E23DD] focus:border-transparent" 
                value=""

            />
        </div>
    )
}