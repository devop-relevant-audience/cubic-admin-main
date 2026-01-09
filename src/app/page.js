"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { userStore } from "./store/user_store";
import CubicButton from "./components/CubicButton";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { login, isAuthenticated } = userStore();

  const correctUser = "cubicadmin";
  const correctPassword = "admin";

  const submitLogin = async () => {
    try {
      if (username === correctUser && password === correctPassword) {
        login(username);
        router.push("/home");
      } else {
        alert("Username or Password is incorrect");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (isAuthenticated) {
        redirect("/home");
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      className="  px-[136px] py-[60px]  h-screen flex items-center justify-start "
      style={{
        // backgroundImage: "url(/bg-loggin.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className=" w-full h-full   max-w-lg bg-cubic-black p-16 rounded-[30px] mx-auto flex flex-col items-center  ">
        <Image
          width={400}
          height={400}
          src={"/logo.avif"}
          className=" mx-auto h-20 w-[306px] "
          alt="logoLogin"
        />
        <div className=" flex flex-col space-y-10 pt-20 pb-10 w-full ">
          <div className=" flex flex-col space-y-2.5">
            <div className="text-white text-xl font-BebasNeue ">Username</div>
            <div>
              <Input
                type="email"
                id="email"
                onChange={(e) => setUsername(e.target.value)}
                className="text-white"
              />
            </div>
          </div>

          <div className=" flex flex-col space-y-2.5">
            <div className="text-white text-xl font-BebasNeue ">Password</div>
            <div>
              <Input
                type="password"
                id="password"
                className="text-white"
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    console.log("Enter");
                  }
                }}
              />
            </div>
          </div>
        </div>
        <CubicButton
          onClick={submitLogin}
          isBlue
          text="Login"
          overWriteClassName={" w-full"}
        />
      </div>
    </div>
  );
}
