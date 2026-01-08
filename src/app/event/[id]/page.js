"use client";
import CubicButton, {
  ClearButton,
  DeleteButton,
  SaveButton,
} from "@/app/components/CubicButton";
import { BackArrowIcon } from "@/app/myicon/myicon";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import useEvent from "../hooks/useEvent";
import EventForm from "../components/EventForm";
import { cubicApi } from "@/app/utils/path.util";
import { useEffect } from "react";

const EventIdPage = () => {
  const router = useRouter();
  const { form, setForm, onChangeInput, setField, onUpdate, onDelete } =
    useEvent();
  const currentPath = usePathname();
  const id = currentPath.split("/").pop();

  const loadEvent = async () => {
    const { data } = await cubicApi.get(`/event/${id}`);
    console.log("data", data);
    setForm({
      ...data.event,
      start_date:
        data.event.start_date !== "" ? new Date(data.event.start_date) : "",
      end_date: data.event.end_date !== "" ? new Date(data.event.end_date) : "",
    });
  };

  useEffect(() => {
    loadEvent();
  }, [id]);

  return (
    <div
      className={cn(
        " w-full  relative min-h-screen bg bg-cubic-black pt-10 px-16  space-y-6"
      )}
    >
      <div className="flex justify-between  w-full">
        <div className="flex items-center space-x-6">
          <div
            className=" cursor-pointer"
            onClick={() => router.push("/event")}
          >
            <BackArrowIcon />
          </div>
          <div className="text-cubic-white text-5xl font-BebasNeue">
            {/* Add Event */}
            {form?.name}
          </div>
        </div>
        <div className=" flex items-center space-x-3 absolute right-[114px] top-[124px]">
          <ClearButton
            text="CANCEL"
            onClick={() => {
              setForm({
                ...form,
                image: "",
                name: "",
                club: "",
                start_date: "",
                end_date: "",
                time: "",
                thumbnail: "",
              });
            }}
          />
          <DeleteButton onClick={() => onDelete()} />
          <SaveButton
            onClick={() => {
              onUpdate();
            }}
          />
        </div>
        {/* <div className="flex space-x-4">
          <div>
            <CubicButton
              text="CANCEL"
              onClick={() => router.push("/cubic-club")}
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
        </div> */}
      </div>

      <div>
        <EventForm
          form={form}
          setForm={setForm}
          onChangeInput={onChangeInput}
          setField={setField}
        />
      </div>
    </div>
  );
};

export default EventIdPage;
