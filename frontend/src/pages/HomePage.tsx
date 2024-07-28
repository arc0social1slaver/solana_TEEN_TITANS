import Index from "../layout/Index";
import BgWelcome from "../assets/images/bg-welcome.jpg";

const HomePage = () => {
    return (
        <Index>
        <section className="relative min-h-screen flex items-center " style={{
            backgroundImage: `url(${BgWelcome})`,
            backgroundSize: "cover",
            backgroundPosition : "center"
        }}
        >
            <div className="relative w-full text-center absolute inset-0 bg-cyan-800 bg-opacity-50">
                <div className="flex justify-center">
                    <h1 className="font-bold font-mono text-6xl text-white ">Welcome! </h1>
                </div>
            </div>
        </section>
    </Index>
    )
}
export default HomePage;