"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function signUpPage() {
  const route = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  async function signup() {
    try {
      setIsLoading(true);
      const response = await axios.post("api/users/signup", user);
      setMessage(response?.data?.message);
      console.log("Signup succssful", response);
      setTimeout(() => {
        route.push("/login");
      }, 2000);
    } catch (error: any) {
      setMessage(error?.response?.data?.error);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex flex-1 flex-col items-center justify-evenly h-screen">
      <h1 className="text-4xl font-bold mt-10">
        {isLoading ? "Loading" : "SignUp"}
      </h1>
      <div className="flex-col space-y-8 items-center flex">
        <div className="flex">
          <label htmlFor="username"></label>
          <input
            id="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="username"
            type="text"
            className="p-2 border-red-500 border-2 rounded bg-red-100 text-red-500 font-semibold "
            autoFocus
          />
        </div>

        <div className="flex">
          <label htmlFor="email"></label>
          <input
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
            type="email"
            className="p-2 border-red-500 border-2 rounded bg-red-100 text-red-500 font-semibold"
          />
        </div>

        <div className="flex">
          <label htmlFor="password"></label>
          <input
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
            type="password"
            className="p-2 border-red-500 border-2 rounded bg-red-100 text-red-500 font-semibold"
          />
        </div>
        <button
          onClick={signup}
          className="rounded p-2 border-2 text-red-500 border-red-500"
        >
          Signup Here
        </button>
        <p className="text-white">{message}</p>
        <Link href="/login" className="text-red-300">
          Go to login page
        </Link>
      </div>
    </div>
  );
}
