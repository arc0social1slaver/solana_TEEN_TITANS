import { NavLink } from "react-router-dom"
import Logo from "../assets/images/logo.png"
function Nav() {
    return (
        <>
        <nav className="bg-gradient-to-r from-gray-500 to-blue-500 flex ">
        
        <div className="flex justify-between items-center">
            <img src={Logo} className="mr-2"/>
            {/* <a href="welcome.html" className="text-white hover:text-gray-200 space-x-16">Home</a> */}
            <NavLink to={"/homePage"} className="text-white hover:text-gray-200 space-x-16">Home</NavLink>
            <NavLink to={"/ExpImp"} className="text-white hover:text-gray-200 space-x-32">Services</NavLink>
            <NavLink to={"#"} className="text-white hover:text-gray-200 space-x-32 p-4">About us</NavLink>
        </div>
        <div className = "flex justify-end items-center space-x-96 ">
            <NavLink to={"/signup"} className="text-white hover:text-gray-200 space-x-64">Hello User</NavLink>
            <NavLink to={"/login"} className="text-white hover:text-gray-200 space-x-32">Log in</NavLink>
        </div>
    </nav>
    </> 
    )
}
export default Nav