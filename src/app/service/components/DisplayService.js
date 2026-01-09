"use client";
import { DragIcon, RightArrowIcon } from "@/app/myicon/myicon";
import { getPathUrl } from "@/app/utils/api.util";
import { getDragStyle } from "@/app/utils/dnd.util";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";

const DisplayService = forwardRef(
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

    const inlineStyle = getDragStyle({
      isDragging,
      withOpacity,
      style,
    });

    return (
      <div
        ref={ref}
        className={cn(
          "bg  w-[422px] hover:scale-105 transition-transform duration-300  "
        )}
        style={inlineStyle}
        {...props}
      >
        <div className="w-[422px] h-[234px] ">
          <Image
            src={getPathUrl(service?.thumbnail_desktop)}
            alt="service"
            width={800}
            height={800}
            className="w-full h-full"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="p-5 flex flex-col space-y-8 bg-gymx-blue">
          <div className="text-cubic-black text-4xl leading-[34px] font-BebasNeue h-[68px] line-clamp-2">
            {service.thumbnail_title}
          </div>
          <div className="flex justify-between items-center">
            <div
              className="flex items-center cursor-pointer font-BebasNeue"
              onClick={() => {
                router.push(`/service/${service.id}`);
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

export default DisplayService;
