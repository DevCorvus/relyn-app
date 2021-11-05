import React from "react";
import Header from "../components/Header";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <div>
      <Header title="Register" />
      <main>
        <RegisterForm />
      </main>
    </div>
  );
}