"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
export default function profilePage() {
  const route = useRouter();
  const logout = async () => {
    try {
      const response = await axios.get("api/users/logout");
      console.log(response);
      toast.success(response?.data?.message);
      setTimeout(() => {
        route.push("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const myProfile = async () => {
    try {
      const response = await axios.get("api/users/profile");
      const user = response?.data?.user;
      console.log(response);

      route.push(`profile/${user.username}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Toaster />
      <h1 className="text-center text-xl font-bold">Profile Page</h1>
      <br />
      <div className="mt-10 flex flex-col space-y-5">
        <button
          className="border-2 border-green-500 p-2 px-10 rounded"
          onClick={logout}
        >
          Logout
        </button>
        <button
          className="border-2 border-red-500 p-2 px-10 rounded"
          onClick={myProfile}
        >
          My Profile
        </button>
      </div>
    </div>
  );
}
