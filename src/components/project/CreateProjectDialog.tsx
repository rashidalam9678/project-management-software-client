"use client"
import axios from "axios"
import { useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from 'next/navigation'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"




const formSchema = z.object({
    title: z.string({
        required_error: "title is required",
        invalid_type_error: "title must be a string",
    }),
    description: z.string({
        required_error: "description is required",
        invalid_type_error: "description must be a string",
    })
})



export default function CreateProjectDialog() {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const { getToken } = useAuth()
    const router=useRouter()

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true)
            const response = await axios.post("http://localhost:8080/api/v1/projects",
                {
                    title: values.title,
                    description: values.description
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${await getToken()}`
                    }
                }
            )
            if (response.status == 200) {
                toast.success('project created successfully')
                router.push(`/projects/${response?.data.data}`)
            }

        } catch (error) {
            toast.error('something went wrong,', {
                description: "unable to process request at the moment. please try again later."
            })
            
        }finally{
            setLoading(false)
            setDialogOpen(false)
        }
    }
    return (
        <>
            <div className=" flex items-center justify-center  cursor-pointer hover:text-blue-600 ">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <div className="flex items-center justify-center border-dashed border-2 p-2 hover:border-blue-600 ">
                            <p><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg></p>
                            <p className="pl-2">new project</p>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>New Project</DialogTitle>
                            <DialogDescription>
                                Create a new project, you can update the fields and add members later
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="project title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="project description" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                        <DialogFooter className="gap-4">
                            {/* <Button variant="outline">cancel</Button> */}
                            <DialogClose asChild>
                                <Button disabled={loading} type="button" variant="outline">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button disabled={loading} onClick={form.handleSubmit(onSubmit)} >{loading? <>Creating...</>:<>Create Project</>}</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
        </>
    )
}