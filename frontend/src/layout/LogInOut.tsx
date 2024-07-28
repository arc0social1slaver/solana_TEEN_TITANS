import Sea3 from "../assets/images/sea3.jpg"
import Logo from "../assets/images/logo.png"
interface LogInOutProps {
    children: React.ReactNode,
    imgSrc: string | undefined,
}
const LogInOut = ({ children, imgSrc }: LogInOutProps) => {
    return <>
        <section className="bg-gray-50 min-h-screen flex item-center justify-center" style={{ 
            backgroundImage: `url(${Sea3})`,
            backgroundSize: "cover",
            backgroundPosition : "center"}} >
            <div className="items-center bg-gray-500 rounded-2xl bg-opacity-50 shadow-lg max-w-3xl w-1/2 p-5">
                <img src={Logo} className="mr-2 mb-4"/>
                    <div className="items-center flex rounded-2xl max-w-3xl p-5 ">

                        <div className="sm:w-1/2 px-5">

                            <h2 className="font-bold text-4xl text-center text-black">Log in</h2>
                            <form id="loginForm"
                                className="flex flex-col gap-2">
                                    {children}
                            </form>
                        </div>
                        <div className="relative w-1/2 ml-4" >
                            <img className="rounded-2xl shadow-lg w-2/5" src={imgSrc}/>
                        </div>
                    </div>
            </div>
        </section>
    </>
};
export default LogInOut