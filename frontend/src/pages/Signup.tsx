import LogInOut from "../layout/LogInOut";
import BgWelcome from "../assets/images/bg-welcome (1).jpg";

const SignUp = () => {
    return <LogInOut imgSrc={BgWelcome}>
        <label htmlFor="email" className="test-sm mt-6 text-gray-">User name:</label>
        <input id="email" className="p-4 border w-full border-gray-500 rounded-xl"
            type="text" name="email" placeholder="Email"/>
            <label htmlFor="password" className="test-sm mt-4 text-gray-700">Password:</label>
            <input id="password" className="p-4 rounded-xl border-gray-500 border"
                type="password" name="password" placeholder="Password"/>
                <label htmlFor="password" className="test-sm mt-4 text-gray-700">Confirm password:</label>
                <input id="password" className="p-4 rounded-xl border-gray-500 border"
                    type="password" name="password" placeholder="Confirm password"/>
                    <button type="button" className="mt-4 bg-gray-800 rounded-xl text-white py-4 w-fit">Sign up</button>
                </LogInOut>
}
                export default SignUp;