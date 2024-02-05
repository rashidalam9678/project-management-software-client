import Link from "next/link"

const Navbar = () => {
  return (
    <div>
        <nav className="flex justify-between items-center h-16 bg-white text-black relative shadow-md font-sans" role="navigation">
            <Link className="pl-8 text-lg font-semibold" href="/">Project X</Link>
        </nav>
        
    </div>
  )
}

export default Navbar