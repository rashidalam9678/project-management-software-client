import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

const Hero = () => {
  return (
    <div className='p-12 mt-16 flex flex-col md:flex-row gap-8 '>
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-blue-500">Welcome to Project X - Your Agile Project Management Solution</h1>
          <p className="pt-4  mb-6 ">
            Project X is your go-to Agile project management tool designed for modern teams. Elevate your project management experience with a platform crafted to streamline collaboration, enhance transparency, and boost productivity. With Project X, you can manage your projects, track your progress, and deliver results with ease. Whether you are a small team or a large enterprise, Project X is the perfect solution for your project management needs.
          </p>

          <Link  href="/sign-in" >
              <Button size="lg" className="mt-4" variant="default">Sign In</Button>
          </Link>
          <p className="text-sm mt-2">unleash the power of collaboration</p>
          
        </div>
        <div className="relative flex-1  md:block hidden">
          <Image className="shadow-md rounded-md" width={600} height={400}  src="/hero-image.png" alt="img"></Image>
          
        </div>
    </div>
  )
}

export default Hero