"use client";
import CubicButton, {
  ClearButton,
  SaveButton,
} from "@/app/components/CubicButton";
import { BackArrowIcon } from "@/app/myicon/myicon";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import useEvent from "../hooks/useEvent";
import EventForm from "../components/EventForm";

const CreateEvent = () => {
  const router = useRouter();
  const { form, setForm, onChangeInput, setField, onCreate } = useEvent();

  return (
    <div
      className={cn(
        " w-full  relative min-h-screen bg bg-cubic-black pt-10 px-16  space-y-6"
      )}
    >
      <div className="flex justify-between  w-full">
        <div className="flex items-center space-x-2">
          <div
            className=" cursor-pointer"
            onClick={() => router.push("/event")}
          >
            <BackArrowIcon />
          </div>
          <div className="text-cubic-white text-5xl font-BebasNeue">
            Add Event
          </div>
        </div>
        <div className=" flex items-center space-x-3 absolute right-[114px] top-[124px]">
          <ClearButton
            text="CANCEL"
            onClick={() => {
              setForm({
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

          <SaveButton
            onClick={() => {
              onCreate();
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
              isBlue={true}
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

export default CreateEvent;
