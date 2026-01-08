"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useService from "../hooks/useService";
import ServiceForm from "../components/ServiceForm";
import CubicButton from "@/app/components/CubicButton";
import { BackArrowIcon } from "@/app/myicon/myicon";
import { cubicApi } from "@/app/utils/path.util";
import { cn } from "@/lib/utils";

const ServiceIdPage = () => {
  const router = useRouter();
  const [tagOption, setTagOption] = useState([]);

  const { form, setForm, onChangeInput, onUpdate, onDelete, setField } =
    useService();

  const currentPath = usePathname();

  const pathSegments = currentPath.split("/"); // Convert string to array
  const id = pathSegments[pathSegments.length - 1];

  useEffect(() => {
    const loadTag = async () => {
      const { data } = await cubicApi.get("/tag");
      const tagOption = data.tags.map((tag, index) => ({
        value: tag.tag,
        label: tag.tag,
      }));

      const { data: serviceData } = await cubicApi.get(`/service/${id}`);

      //if no card_home_desktop and card_home_mobile key value in serviceData.service, set it to empty string
      if (!serviceData.service.card_home_desktop) {
        serviceData.service.card_home_desktop = "";
      }
      if (!serviceData.service.card_home_mobile) {
        serviceData.service.card_home_mobile = "";
      }

      setForm(serviceData.service);

      setTagOption(tagOption);
    };
    loadTag();
  }, [id]);

  return (
    <div className={cn(" w-full    bg bg-cubic-black pt-10 px-20  space-y-6")}>
      <div className="flex justify-between  w-full">
        <div className="flex items-center space-x-2">
          <div
            className=" cursor-pointer"
            onClick={() => router.push("/service")}
          >
            <BackArrowIcon />
          </div>
          <div className="text-cubic-white text-5xl">
            {form.thumbnail_title}
          </div>
        </div>
        <div className="flex space-x-4">
          <div>
            <CubicButton
              text="CANCEL"
              onClick={() => router.push("/service")}
            />
          </div>
          <div
            className="cursor-pointer  bg bg-cubic-white w-[160px] h-[48px] flex items-center justify-center"
            onClick={() => onDelete()}
          >
            <div>Delete</div>
          </div>
          <div>
            <CubicButton
              text="SAVE"
              isYellow={true}
              onClick={() => {
                onUpdate();
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <ServiceForm
          form={form}
          setForm={setForm}
          onChangeInput={onChangeInput}
          tagOption={tagOption}
          setField={setField}
        />
      </div>
    </div>
  );
};
export default ServiceIdPage;
