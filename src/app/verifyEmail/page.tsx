"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function email() {
  const [verified, setVerified] = useState(false);
  async function getToken() {
    try {
      const url = window.location;
      const token = new URLSearchParams(url.search).get("token");
      console.log(token);
      const response = await axios.post("api/users/verifyEmail", { token });
      console.log(response?.data?.message);
      setVerified(true);
    } catch (error: any) {
      console.log(error.message);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <button
        onClick={getToken}
        className="rounded p-2 px-10 border-2 text-green-500 border-green-500 mb-5"
      >
        Verify
      </button>
      {verified ? (
        <Link
          href={"/login"}
          className="rounded p-2 px-10 border-2 text-red-500 border-red-500"
        >
          Login
        </Link>
      ) : (
        <p>Email not yet verified</p>
      )}
    </div>
  );
}
