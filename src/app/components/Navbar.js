import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { userStore } from "../store/user_store";
import { CubicLogo, HamburgerIcon, LogoutIcon } from "../myicon/myicon";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Navbar = ({}) => {
  const { logout } = userStore();
  const router = useRouter();
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(false);

  const submitLogout = () => {
    logout();
    router.push("/");
  };
  return (
    <div className="">
      <div
        className={cn(
          " fixed z-10 w-full h-20 pl-[55px] pr-[64px] flex justify-between items-center  bg-[#282828]  ",
          pathname === "/" ? "hidden" : ""
        )}
      >
        <div
          className="cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <HamburgerIcon />
        </div>
        <div>
          <CubicLogo />
        </div>
        <div className="flex items-center space-x-[11px] font-BebasNeue text-lg h-[22px]">
          <div className="text-cubic-white  ">Admin</div>
          <div className=" w-[1px] h-full bg-white"></div>
          <div onClick={submitLogout} className="  text-cubic-white ">
            {" "}
            Logout
          </div>
        </div>
      </div>
      <div className="">
        <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      </div>
    </div>
  );
};

export default Navbar;
