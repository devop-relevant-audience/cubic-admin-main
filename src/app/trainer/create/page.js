"use client";
import CubicButton, {
  ClearButton,
  SaveButton,
} from "@/app/components/CubicButton";
import { BackArrowIcon } from "@/app/myicon/myicon";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import useTrainer from "../hooks/useTrainer";
import TrainerForm from "../components/TrainerForm";

const CreateTrainerPage = () => {
  const router = useRouter();
  const { form, setForm, onChangeInput, onCreate, setField } = useTrainer();

  return (
    <div
      className={cn(
        " w-full  relative  bg bg-cubic-black py-10 px-20  space-y-6"
      )}
    >
      <div className="flex justify-between  w-full">
        <div className="flex items-center space-x-6">
          <div
            className=" cursor-pointer"
            onClick={() => router.push("/trainer")}
          >
            <BackArrowIcon />
          </div>
          <div className="text-cubic-white text-5xl font-BebasNeue">
            Add Trainer
          </div>
        </div>
        <div className=" flex items-center space-x-3 absolute right-[114px] top-[124px]">
          <ClearButton text="CANCEL" onClick={() => router.push("/trainer")} />
          {/* <DeleteButton onClick={() => onDelete()} /> */}
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
              onClick={() => router.push("/trainer")}
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
        <TrainerForm
          form={form}
          setForm={setForm}
          onChangeInput={onChangeInput}
          setField={setField}
        />
      </div>
    </div>
  );
};

export default CreateTrainerPage;
