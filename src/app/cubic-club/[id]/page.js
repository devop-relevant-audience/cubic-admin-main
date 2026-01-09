"use client";
import CubicButton, {
  ClearButton,
  DeleteButton,
  SaveButton,
} from "@/app/components/CubicButton";
import { BackArrowIcon } from "@/app/myicon/myicon";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { cubicApi } from "@/app/utils/path.util";
import useClub from "../hooks/useClub";
import ClubForm from "../components/ClubForm";

const ClubIdPage = () => {
  const router = useRouter();
  const {
    form,
    setForm,
    onChangeInput,
    setField,
    onCreate,
    onUpdate,
    onDelete,
  } = useClub();

  const currentPath = usePathname();

  const pathSegments = currentPath.split("/"); // Convert string to array
  const id = pathSegments[pathSegments.length - 1];

  useEffect(() => {
    const loadClub = async () => {
      const { data } = await cubicApi.get(`/club/${id}`);
      setForm(data.club);
    };
    loadClub();
  }, [id]);

  return (
    <div
      className={cn(
        " w-full relative  bg bg-cubic-black min-h-screen pt-10 px-16  space-y-6"
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
            {form.location_name}
          </div>
        </div>
        <div className=" flex items-center space-x-3 absolute right-[114px] top-[124px]">
          <ClearButton
            text="CANCEL"
            onClick={() => router.push("/cubic-club")}
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
          <div
            className="cursor-pointer  bg bg-cubic-white w-[160px] h-[48px] flex items-center justify-center"
            onClick={() => onDelete()}
          >
            <div>Delete</div>
          </div>

          <div>
            <CubicButton
              text="SAVE"
              isBlue={true}
              onClick={() => {
                onUpdate();
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

export default ClubIdPage;
