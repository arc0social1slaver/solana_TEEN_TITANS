import IndexWelcome from "../layout/IndexWelcome";
import Bg1 from "../assets/images/bg1.jpg";
import { NavLink } from "react-router-dom";


const Welcome = () => {
    
    return (
        <IndexWelcome>
            <section className="relative min-h-screen flex items-center " style={{
                backgroundImage: `url(${Bg1})`,
                backgroundSize: "cover",
                backgroundPosition : "center"
            }}
            >
                <div className="relative w-full text-center absolute inset-0 bg-cyan-800 bg-opacity-50">
                    <div className="flex justify-center">
                        <h1 className="font-bold font-mono text-6xl text-white ">Welcome! </h1>
                        <NavLink to={"/login"} className="font-bold font-mono text-6xl text-white mx-6 hover-change"> Log in </NavLink>
                        <h1 className="font-bold font-mono text-6xl text-white ">to continue </h1>
                    </div>
                    <div className="flex justify-center">
                        <h2 className="font-bold font-mono text-4xl text-white mr-4">Don't have account?</h2>
                        <NavLink to={"/signup"} className="font-bold font-mono text-4xl text-white font-bold hover-change"> Sign up </NavLink>
                    </div>
                </div>
            </section>
        </IndexWelcome>
    )
}
export default Welcome;