"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { cubicApi } from "@/app/utils/path.util";
import CubicInput from "@/app/components/CubicInput";
import { BlackXicon, SettingIcon } from "@/app/myicon/myicon";
import CubicButton from "@/app/components/CubicButton";

const CubicEventTagDialog = ({}) => {
  const [tag, setTag] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const loadTag = async () => {
      const { data } = await cubicApi.get(`/eventtag`);
      setTag(data.eventtags);
    };
    loadTag();
  }, [trigger]);

  const addTag = async () => {
    if (!newTag || newTag === "") {
      return;
    }
    const { data } = await cubicApi.post(`/eventtag`, {
      tag: newTag,
    });
    setTrigger(trigger + 1);
    setNewTag("");
  };
  return (
    <Dialog className="w-full h-[448px] ">
      <DialogTrigger className="p-0" asChild>
        <div className="flex items-center space-x-1">
          <SettingIcon />
          <div className="text-gymx-blue text-sm font-normal ">
            setting tag
          </div>
        </div>
      </DialogTrigger>
      <DialogTitle></DialogTitle>
      <DialogContent
        classNameXIcon="absolute top-[60px] right-[60px]"
        className=" w-full border-none p-[60px] !rounded-[0px] bg bg-cubic-gray2 h-[448px] max-w-[946px]  xl:max-w-[1175px] 3xl:max-w-[1240px] "
      >
        <div className="space-y-5 w-full">
          <div className="text-white text-[32px] font-normal font-BebasNeue">
            Tag for service
          </div>
          <div className="flex items-center  space-x-[15px] w-full">
            <CubicInput
              className=" w-full h-[40px] border border-waraporn-lightgray"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <CubicButton
              overWriteClassName={"w-[160px]"}
              isBlue
              onClick={addTag}
              text="Add"
            />
          </div>
          <div className="w-full h-[200px] bg bg-cubic-white  p-4 overflow-x-scroll ">
            <div className="flex flex-wrap  flex-row items-start">
              {tag?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="h-[24px] flex items-center justify-center  border border-cubic-gray5  p-2 space-x-4 mr-4 mt-4 "
                  >
                    <div className="text-xs font-normal">{item.tag}</div>
                    <div
                      className={cn("cursor-pointer")}
                      onClick={async () => {
                        await cubicApi.delete(`/eventtag/${item._id}`);
                        setTrigger(trigger + 1);
                      }}
                    >
                      {/* <Image
                        width={18}
                        height={18}
                        src="/x_close.png"
                        alt="delete"
                        className="w-[18px] h-[18px]"
                      /> */}
                      <BlackXicon />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CubicEventTagDialog;
