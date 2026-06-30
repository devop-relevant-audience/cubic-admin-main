"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { userStore } from "../store/user_store";
import { Fade, Slide } from "react-awesome-reveal";
import { XICON } from "../myicon/myicon";

const menuList = [
  {
    path: "/home",
    hover: "Home",
  },
  {
    path: "/service",
    hover: "Service",
  },
  {
    path: "/trainer",
    hover: "Trainer",
  },
  {
    path: "/cubic-club",
    hover: "GymX Clubs",
  },
  {
    path: "/inquiry",
    hover: "Inquiry",
  },
  {
    path: "/event",
    hover: "Event",
  },
];

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const pathname = usePathname();

  const baseSegment = pathname.split("/")[1];

  const router = useRouter();

  const isNothing = pathname === "/";

  const submitLogout = () => {
    logout();
    router.push("/");
  };

  const { logout } = userStore();
  const userSidebar = [
    {
      icon: "/user_icon.png",
      hover: "GymX Admin",
      onClick: () => {},
    },
    {
      icon: "/logout_icon.png",
      hover: "Log out",
      onClick: submitLogout,
    },
  ];

  return (
    <div
      className={cn(
        showSidebar ? "opacity-100" : "opacity-0 hidden ",
        "bg-black w-full h-full fixed top-0 left-0 z-50 bg-opacity-50 transition-all duration-300"
      )}
    >
      <Slide
        triggerOnce
        className={cn(showSidebar ? "fixed z-20 top-0" : "hidden")}
      >
        <div
          className={cn(
            " bg-[#282828]  w-[250px] h-screen flex flex-col justify-between px-[24px]  pb-[28px]  relative",
            isNothing && "hidden"
          )}
        >
          <div className="flex flex-col pt-[84px] font-BebasNeue">
            <div className="space-y-[22px]">
              {menuList.map((menu, index) => {
                const isActive = menu.path.includes(baseSegment);
                return (
                  <div
                    key={index}
                    onClick={() => {
                      router.push(menu.path);
                      setShowSidebar(false);
                    }}
                    className={` flex items-center cursor-pointer h-[54px] px-[13px] py-2   ${
                      isActive
                        ? "text-gymx-blue bg-cubic-gray "
                        : "text-cubic-white hover:bg-cubic-gray duration-100 "
                    }`}
                  >
                    <div className="flex items-center space-x-[11px]">
                      {/* <Image
                      width={100}
                      height={100}
                      src={menu.icon}
                      alt={menu.hover}
                      className=" w-6 h-6"
                    /> */}
                      <div
                        className={cn(
                          "text-cubic-white text-[32px] font-normal ",
                          isActive && "text-gymx-blue"
                        )}
                      >
                        {menu.hover}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="absolute top-[14px] right-2.5 cursor-pointer "
            onClick={() => setShowSidebar(false)}
          >
            <div className="w-12 h-12 flex justify-center items-center ">
              <XICON />
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default Sidebar;
