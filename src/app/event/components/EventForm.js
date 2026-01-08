"use client";
import { CubicHeadTitle } from "@/app/components/CubicHeadTitle";
import CubicInput from "@/app/components/CubicInput";
import CubicMultiSelect from "@/app/components/CubicMulitiSelect";
import CubicSelect from "@/app/components/CubicSelect";
import MyDatePicker from "@/app/components/DatePicker";
import UploadDisplayPhoto from "@/app/components/UploadDisplayPhoto";
import { cubicApi } from "@/app/utils/path.util";
import { useEffect, useState } from "react";
import CubicEventTagDialog from "./CubicEventTagDialog";
import { cn } from "@/lib/utils";

const EventForm = ({ form, setForm, onChangeInput, setField }) => {
  const [clubOption, setClubOption] = useState([]);

  const loadClub = async () => {
    const { data } = await cubicApi.get("/club");
    setClubOption(
      data.clubs.map((club) => ({
        label: club.location_name,
        value: club.location_name,
      }))
    );
  };
  useEffect(() => {
    loadClub();
  }, []);

  console.log("form", form);

  return (
    <div className="bg bg-cubic-gray2 w-full h-full pt-4 pb-[33px] px-8 space-y-4">
      <CubicHeadTitle title="EVENT INFO" />

      <div className="grid grid-cols-2 gap-[19px] w-full">
        <div className="flex items-center space-x-4">
          <UploadDisplayPhoto
            form={form}
            setForm={setForm}
            value={form.thumbnail}
            borderClassName="w-[300px] h-[420px]"
            overWriteClassName="w-[300px] h-full"
            name="thumbnail"
            photoDesctiption="  Image (size : 516 x 776  px)"
          />
          <UploadDisplayPhoto
            form={form}
            setForm={setForm}
            value={form.image}
            borderClassName="w-[300px] h-[420px]"
            overWriteClassName="w-[300px] h-full"
            name="image"
            photoDesctiption=" Video and Image (size : 516 x 776  px)"
          />
        </div>

        <div className=" ">
          <CubicInput
            title="Name"
            //   description="The description must contain a minimum of 15 characters."
            onChange={onChangeInput}
            name="name"
            value={form.name}
            className="w-full"
          />

          <div className="grid grid-cols-2 gap-x-[31px] gap-y-6 mt-6 ">
            <div className="">
              <div
                className={cn(
                  "flex  items-center cursor-pointer justify-between"
                )}
              >
                <div className="text-cubic-white  text-sm font-bold  ">
                  Club
                </div>
                <div>
                  <CubicEventTagDialog />
                </div>
              </div>
              <div>
                <CubicMultiSelect
                  options={clubOption}
                  // text="Trainer Tag"
                  value={clubOption.filter((option) =>
                    form.club.includes(option.value)
                  )}
                  onChange={(selectedOptions) => {
                    // if (selectedOptions.length > 4) return;

                    const selectedValues = selectedOptions.map(
                      (option) => option.value
                    ); // Extract values
                    setForm((prevForm) => ({
                      ...prevForm,
                      club: selectedValues, // Store only string values
                    }));
                  }}
                />
              </div>
            </div>
            <div className="space-y-[6px]">
              <div className="text-cubic-white text-sm font-bold">Date</div>
              <MyDatePicker
                style={{ width: "var(--radix-popper-anchor-width)" }}
                title="Date"
                onChange={(dateRange) => {
                  setField("start_date")(dateRange.start); // Set the start date
                  setField("end_date")(dateRange.end); // Set the end date
                }}
                value={[form.start_date, form.end_date]} // Pass start_date and end_date as the value
                className="h-[40px] p-4 w-[calc(50vh-36px)] "
              />
            </div>
            <CubicInput
              title="Time"
              //   description="The description must contain a minimum of 15 characters."
              onChange={onChangeInput}
              name="time"
              value={form.time}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
