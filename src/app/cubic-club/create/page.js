"use client";
import CubicButton, {
  ClearButton,
  SaveButton,
} from "@/app/components/CubicButton";
import { BackArrowIcon } from "@/app/myicon/myicon";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import useClub from "../hooks/useClub";
import ClubForm from "../components/ClubForm";

const CreateClubPage = () => {
  const router = useRouter();
  const { form, setForm, onChangeInput, setField, onCreate } = useClub();

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
            onClick={() => router.push("/cubic-club")}
          >
            <BackArrowIcon />
          </div>
          <div className="text-cubic-white text-5xl font-BebasNeue">
            Add CLUB
          </div>
        </div>
        <div className=" flex items-center space-x-3 absolute right-[114px] top-[124px]">
          <ClearButton
            text="CANCEL"
            onClick={() => router.push("/cubic-club")}
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
              isYellow={true}
              onClick={() => {
                onCreate();
              }}
            />
          </div>
        </div> */}
      </div>

      <div>
        <ClubForm
          form={form}
          setForm={setForm}
          onChangeInput={onChangeInput}
          setField={setField}
        />
      </div>
    </div>
  );
};

export default CreateClubPage;
