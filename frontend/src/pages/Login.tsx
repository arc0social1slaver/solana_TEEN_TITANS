import LogInOut from "../layout/LogInOut"
import Accout3 from "../assets/images/account3.png";

function resetForm() {
  const form = document.getElementById('myForm') as HTMLFormElement | null;

  if (form) {
      form.reset();
  }
}
const Login = () => {
    function login() {
      const email : string = (document.getElementById("email") as HTMLInputElement).value;
      const password : string = (document.getElementById("password") as HTMLInputElement).value;
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (emailRegex.test(email) && password.trim() !== "") {
          window.location.href ="/homePage";
            
        } else {
          alert("Invalid email or password");
        }
    
        (document.getElementById("loginForm") as HTMLInputElement).reset();
        (document.getElementById("email") as HTMLInputElement).focus();
    }
    function checkEnter(event) {
        if (event.key === "Enter") {
          login();
        }
    }
    return <LogInOut imgSrc={Accout3}>
        <label htmlFor="email" className="test-sm mt-6 text-white">User name:</label>
        <input id="email" className="p-4 border w-full border-gray-500 rounded-xl" onKeyPress={checkEnter}
            type="text" name="email" placeholder="Email"/>
            <label htmlFor="password" className="test-sm mt-4 text-white">Password:</label>
            <input id="password" className="p-4 rounded-xl border-gray-500 border" onKeyPress={checkEnter}
                type="password" name="password" placeholder="Password"/>
                <button type="button" onClick={login} className="mt-4 bg-gray-800 rounded-xl text-white py-4 w-fit" >Log in</button>
            </LogInOut>
}
            export default Login