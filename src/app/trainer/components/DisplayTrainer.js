"use client";
import { DragIcon, RightArrowIcon } from "@/app/myicon/myicon";
import { getImgSrc, getPathUrl } from "@/app/utils/api.util";
import { getDragStyle } from "@/app/utils/dnd.util";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";

const DisplayTrainer = forwardRef(
  (
    {
      service,
      setTrigger,
      withOpacity,
      isDragging,
      style,
      listeners = {},
      ...props
    },
    ref
  ) => {
    const router = useRouter();

    console.log("service", service);

    const inlineStyle = getDragStyle({
      isDragging,
      withOpacity,
      style,
    });

    return (
      <div
        ref={ref}
        className={cn(
          "w-[310px] h-[470px]  flex flex-col  justify-end px-[21px] pb-[50px] cursor-pointe "
        )}
        style={{
          ...inlineStyle,
          backgroundImage: service?.photo?.[0]
            ? `url(${getImgSrc(service.photo[0])})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        {...props}
        onClick={() => {
          router.push(`/trainer/${service.id}`);
        }}
      >
        <div className=" font-BebasNeue">
          <div className="text-cubic-yellow text-5xl">{service.name}</div>
          <div className="text-cubic-yellow text-4xl line-clamp-2">
            {service.position}
          </div>
        </div>

        <div className="p-5 flex flex-col space-y-8 bg-cubic-yellow">
          <div className="flex justify-between items-center">
            <div
              className="flex items-center cursor-pointer font-BebasNeue"
              onClick={() => {
                router.push(`/trainer/${service.id}`);
              }}
            >
              <div className="text-cubic-black  text-xl">Edit</div>
              <div>
                <RightArrowIcon />
              </div>
            </div>

            <div {...listeners} className="cursor-grabbing">
              <DragIcon />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default DisplayTrainer;
