import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";

export default function Login() {
  return (
    <div>
      <Header title="Login" />
      <main>
        <LoginForm />
        <div className="mt-4">
          <p className="font-semibold">You do not have an account? <Link to="/register" className="text-blue-400 hover:underline focus:underline hover:text-blue-500 focus:text-blue-500 transition">Register one here!</Link></p>
        </div>
      </main>
    </div>
  );
}