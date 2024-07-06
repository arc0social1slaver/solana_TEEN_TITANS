import React, { useState } from 'react';
import SignUpBg from "../layout/SignUpBg";
import BgWelcome from "../assets/images/bg-welcome (1).jpg";

const SignUp = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  function checkEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      signUp(); // Call signUp function when Enter key is pressed
    }
  }

  function signUp() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Invalid email format");
      return;
    }

    if (password.trim() === '') {
      alert("Password cannot be empty");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Handle successful signup logic, e.g., redirecting to another page
    window.location.href = "/Login";
  }

  return (
    <SignUpBg imgSrc={BgWelcome}>
      <div className="flex flex-col items-center">
        <form id="signUpForm" className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm mt-6 text-gray-">Email:</label>
          <input
            id="email"
            className="p-4 border w-full border-gray-500 rounded-xl"
            onKeyPress={checkEnter}
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="text-sm mt-4 text-gray-700">Password:</label>
          <input
            id="password"
            className="p-4 rounded-xl border-gray-500 border"
            onKeyPress={checkEnter}
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="confirmPassword" className="text-sm mt-4 text-gray-700">Confirm password:</label>
          <input
            id="confirmPassword"
            className="p-4 rounded-xl border-gray-500 border"
            onKeyPress={checkEnter}
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={signUp}
            className="mt-4 bg-gray-800 rounded-xl text-white py-4 w-fit"
          >
            Sign up
          </button>
        </form>
      </div>
    </SignUpBg>
  );
};

export default SignUp;
