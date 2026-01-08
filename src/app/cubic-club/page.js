"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  BlackCycle,
  BlackDumbell,
  BlackLockerIcon,
  BlackParkingIcon,
  BlackRefuelBarIcon,
  BlackRunning,
  BlackShowersIcon,
  BlackWifiIcon,
  PlusIcon,
  TwoThunderCafeIcon,
} from "../myicon/myicon";
import CubicButton from "../components/CubicButton";
import { cubicApi } from "../utils/path.util";
import { useEffect, useState } from "react";
import { getImgSrc } from "../utils/api.util";
import Image from "next/image";

const ClubPage = () => {
  const router = useRouter();
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const loadClub = async () => {
      const { data } = await cubicApi.get("/club");
      setClubs(data.clubs);
    };
    loadClub();
  }, []);

  return (
    <div
      className={cn(
        " w-full min-h-screen   bg bg-cubic-black pt-10 px-16  space-y-6"
      )}
    >
      <div className="flex justify-between  w-full">
        <div className="text-white text-5xl font-normal font-BebasNeue">
          cubic clubs
        </div>
        <div
          className=" cursor-pointer"
          onClick={() => {
            router.push("/cubic-club/create");
          }}
        >
          <CubicButton text="ADD CLUB" icon={<PlusIcon />} />
        </div>
      </div>

      <div className="grid grid-cols-3">
        {clubs?.map((club, index) => {
          const isSauna = club.sauna_room;
          const isLocker = club.locker_room;
          const isParking = club.parking;
          const isShower = club.shower_room;
          const isWifi = club.wifi;
          const isRefuel = club.refuel_bar;
          const isFreeText1 = club.free_boolean1;
          const isFreeText2 = club.free_boolean1;
          const isFreeText3 = club.free_boolean1;
          const freeText1 = club.free_text1;
          const freeText2 = club.free_text2;
          const freeText3 = club.free_text3;

          return (
            <div
              className="w-[375px] h-[600px] p-4 cursor-pointer"
              key={index}
              onClick={() => {
                router.push(`/cubic-club/${club._id}`);
              }}
            >
              <Image
                src={getImgSrc(club.photo[0])}
                alt="club"
                className="w-full h-[312px] object-cover"
                width={375}
                height={312}
              />
              <div className="bg bg-cubic-yellow px-4 py-6 flex flex-col space-y-10">
                <div>
                  <div className="text-[#0f0f0e] text-4xl font-normal font-BebasNeue uppercase leading-[32px]">
                    {club.location_name}
                  </div>
                  <div className=" pt-3 text-cubic-black text-base font-light font-Inter leading-tight">
                    {club.address}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 ">
                  {/* <div
                    className={cn(
                      isSauna ? "flex space-x-2 items-center" : "hidden"
                    )}
                  >
                    <BlackSaunaIcon />
                    <div className="text-[#0f0f0e] text-xs font-black font-Inter leading-3">
                      Sauna Room
                    </div>
                  </div> */}

                  <div
                    className={cn(
                      isShower ? "flex space-x-2 items-center" : "hidden"
                    )}
                  >
                    <BlackShowersIcon />
                    <div className="text-[#0f0f0e] text-xs font-black font-Inter leading-3">
                      Shower & Toiletries
                    </div>
                  </div>

                  <div
                    className={cn(
                      isLocker ? "flex space-x-2 items-center" : "hidden"
                    )}
                  >
                    <BlackLockerIcon />
                    <div className="text-[#0f0f0e] text-xs font-black font-Inter leading-3">
                      Locker Room
                    </div>
                  </div>

                  <div
                    className={cn(
                      isWifi ? "flex space-x-2 items-center" : "hidden"
                    )}
                  >
                    <BlackWifiIcon />
                    <div className="text-[#0f0f0e] text-xs font-black font-['Inter'] leading-3">
                      Free WIFI
                    </div>
                  </div>

                  <div
                    className={cn(
                      isRefuel ? "flex space-x-2 items-center" : "hidden"
                    )}
                  >
                    <TwoThunderCafeIcon />
                    <div className="text-[#0f0f0e] text-xs font-black font-Inter leading-3">
                      Water station
                    </div>
                  </div>

                  <div
                    className={cn(
                      isParking ? "flex space-x-2 items-center" : "hidden"
                    )}
                  >
                    <div className="">
                      <BlackParkingIcon />
                    </div>
                    <div className="text-[#0f0f0e] text-xs font-black font-Inter leading-3">
                      Parking
                    </div>
                  </div>

                  <div
                    className={cn(
                      isFreeText3 ? "flex space-x-2 items-center" : "hidden"
                    )}
                  >
                    <div className="">
                      <BlackDumbell />
                    </div>
                    <div className="text-[#0f0f0e] text-xs font-black font-Inter leading-3">
                      {freeText3}
                    </div>
                  </div>

                  <div
                    className={cn(
                      isFreeText1 ? "flex space-x-2 items-center" : "hidden"
                    )}
                  >
                    <div className="">
                      <BlackCycle />
                    </div>
                    <div className="text-[#0f0f0e] text-xs font-black font-Inter leading-3">
                      {freeText1}
                    </div>
                  </div>

                  <div
                    className={cn(
                      isFreeText2 ? "flex space-x-2 items-center" : "hidden"
                    )}
                  >
                    <div className="">
                      <BlackRunning />
                    </div>
                    <div className="text-[#0f0f0e] text-xs font-black font-Inter leading-3">
                      {freeText2}
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

export default ClubPage;
