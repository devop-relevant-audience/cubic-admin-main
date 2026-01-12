"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { CalendarIcon2, PinIcon, PlusIcon, TimeIcon } from "../myicon/myicon";
import CubicButton from "../components/CubicButton";
import { cubicApi } from "../utils/path.util";
import { useEffect, useState } from "react";
import { getImgSrc } from "../utils/api.util";
import Image from "next/image";
import { DateTime } from "luxon";
import { TimerIcon } from "lucide-react";

const EventPage = () => {
  const router = useRouter();
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const loadClub = async () => {
      const { data } = await cubicApi.get("/event");

      console.log("data", data.events);
      setClubs(data.events);
    };
    loadClub();
  }, []);

  return (
    <div
      className={cn(" w-full h-full bg bg-cubic-black py-10 px-16  space-y-6")}
    >
      <div className="flex justify-between  w-full h-full ">
        <div className="text-white text-5xl font-normal font-BebasNeue">
          Event
        </div>
        <div
          className=" cursor-pointer"
          onClick={() => {
            router.push("/event/create");
          }}
        >
          <CubicButton text="ADD EVENT" icon={<PlusIcon />} />
        </div>
      </div>

      <div className="grid grid-cols-3 h-full ">
        {clubs?.map((club, index) => {
          return (
            <div
              className="w-[375px]  cursor-pointer"
              key={index}
              onClick={() => {
                router.push(`/event/${club._id}`);
              }}
            >
              <Image
                src={getImgSrc(club.thumbnail)}
                alt="club"
                className="w-[375px] h-[564px] object-cover "
                width={1920}
                height={1080}
                quality={100}
                priority={true}
              />
              <div className="bg bg-gymx-blue p-6 flex flex-col font-BebasNeue">
                <div>
                  <div className="text-[#f8f8f8] text-[24px] font-normal  uppercase leading-[32px] h-[58px]">
                    {club.name}
                  </div>
                  <div className="flex space-x-2 items-center pt-2 text-[#f8f8f8]">
                    <div className="flex items-center space-x-3">
                      <PinIcon className={"w-8 h-8"} />
                      <div className=" text-lg ">{club.club}</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CalendarIcon2 className={"w-8 h-8"} />
                      <div className="   text-lg ">
                        {club.start_date !== ""
                          ? DateTime.fromISO(club.start_date).toFormat("dd")
                          : ""}{" "}
                        -{" "}
                        {club.end_date !== ""
                          ? DateTime.fromISO(club.end_date).toFormat(
                              "dd MMMM yyyy"
                            )
                          : ""}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <TimeIcon className={"w-[19.5px] h-[19.5px]"} />
                      <div className="  text-lg ">{club.time}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventPage;
