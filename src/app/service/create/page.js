"use client";
import CubicButton from "@/app/components/CubicButton";
import { BackArrowIcon } from "@/app/myicon/myicon";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import useService from "../hooks/useService";
import { useEffect, useState } from "react";
import { cubicApi } from "@/app/utils/path.util";
import ServiceForm from "../components/ServiceForm";

const CreateServicePage = () => {
  const router = useRouter();
  const [tagOption, setTagOption] = useState([]);

  const { form, setForm, onChangeInput, onCreate, setField } = useService();

  useEffect(() => {
    const loadTag = async () => {
      const { data } = await cubicApi.get("/tag");
      const tagOption = data.tags.map((tag, index) => ({
        value: tag.tag,
        label: tag.tag,
      }));
      setTagOption(tagOption);
    };
    loadTag();
  }, []);

  return (
    <div
      className={cn(
        " w-full    bg bg-cubic-black pt-10 px-16  pb-10 space-y-[21px] "
      )}
    >
      <div className="flex justify-between  w-full">
        <div className="flex items-center space-x-6">
          <div
            className=" cursor-pointer"
            onClick={() => router.push("/service")}
          >
            <BackArrowIcon />
          </div>
          <div className="text-cubic-white text-5xl font-BebasNeue">
            Add Service
          </div>
        </div>
        <div className="flex space-x-4">
          <div>
            <CubicButton
              text="CANCEL"
              onClick={() => router.push("/service")}
            />
          </div>
          <div>
            <CubicButton
              text="SAVE"
              isYellow={true}
              onClick={() => {
                onCreate();
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

export default CreateServicePage;
