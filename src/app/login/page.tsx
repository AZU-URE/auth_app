"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
export default function loginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();
  async function login() {
    try {
      setIsLoading(true);
      const response = await axios.post("api/users/login", user);
      // console.log("hii");
      if (response?.data?.error) {
        toast.error(response?.data?.error);
      } else {
        toast.success(response?.data?.message);
        setTimeout(() => {
          route.push("/profile");
        }, 2000);
      }
    } catch (error: any) {
      // console.log("helllo");
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  return (
    <div className="flex flex-1 flex-col items-center justify-evenly h-screen">
      <h1 className="text-4xl font-bold mt-10">
        {isLoading ? "Loading" : "Login"}
      </h1>
      <div className="flex-col space-y-8 items-center flex">
        <div className="flex m-4">
          <label htmlFor="email"></label>
          <input
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
            type="email"
            className="p-2 border-red-500 border-2 rounded bg-red-100 text-red-500 font-semibold "
            autoFocus
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
            className="p-2 border-red-500 border-2 rounded bg-red-100 text-red-500 font-semibold "
          />
        </div>
        <button
          onClick={login}
          className="rounded p-2 border-2 text-red-500 border-red-500"
        >
          Login Here
        </button>
        <Toaster />
        <Link href="/signup" className="text-red-300">
          Go to signup page
        </Link>
      </div>
    </div>
  );
}
