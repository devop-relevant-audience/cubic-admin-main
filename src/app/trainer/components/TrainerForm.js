"use client";
import {
  ClearButton,
  DeleteButton,
  SaveButton,
} from "@/app/components/CubicButton";
import { CubicHeadTitle } from "@/app/components/CubicHeadTitle";
import CubicInput from "@/app/components/CubicInput";
import CubicMultiSelect from "@/app/components/CubicMulitiSelect";
import CubicSelect from "@/app/components/CubicSelect";
import CubicTextArea from "@/app/components/CubicTextArea";
import {
  BinIcon,
  CubicIconOption,
  UploadIcon,
  YellowBinIcon,
} from "@/app/myicon/myicon";
import CubicTagDialog from "@/app/service/components/CubicTagDialog";
import { getFileTypeFromExtension, getImgSrc } from "@/app/utils/api.util";
import { cubicApi } from "@/app/utils/path.util";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const trainerTagOption = [
  {
    label: "Weight Lost",
    value: "weight_lost",
  },
  {
    label: "Reshape",
    value: "reshape",
  },
  {
    label: "Body Building",
    value: "body_building",
  },
  {
    label: "Nutrition",
    value: "nutrition",
  },
];

const workoutTagOption = [
  {
    label: "Spin",
    value: "spin",
  },
  {
    label: "HIIT",
    value: "hiit",
  },
  {
    label: "Pilates",
    value: "pilates",
  },
  {
    label: "Personal Training",
    value: "personal_training",
  },
];

const iconOption = [
  { label: "GymX (Default)", value: "cubic" },
  { label: "barbell", value: "barbell" },
  { label: "drumbell", value: "drumbell" },
  { label: "treadmill", value: "treadmill" },
  { label: "cycle", value: "cycle" },
  { label: "timer", value: "timer" },
  { label: "music", value: "music" },
  { label: "woman", value: "woman" },
  { label: "man", value: "man" },
  { label: "lock", value: "lock" },
  { label: "certificate", value: "certificate" },
  { label: "food", value: "food" },
  { label: "plus", value: "plus" },
  { label: "education", value: "education" },
];

const TrainerForm = ({ form, setForm, onChangeInput, setField }) => {
  const inputRef = useRef(null);
  const router = useRouter();

  const [serviceOptions, setServiceOptions] = useState([]);
  const [trainnerTagOption, setTrainerTagOption] = useState([]);

  const handlePhotoUpload = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      photo: [...prevForm.photo, e.target.files[0]],
    }));
  };

  useEffect(() => {
    const loadService = async () => {
      const { data } = await cubicApi.get("/service", {
        select: "banner_name",
      });

      const { data: trainertag } = await cubicApi.get("/trainertag");

      //make data.service to options
      const options = data.services.map((service) => ({
        label: service.banner_name,
        value: service.banner_name,
      }));

      const trainnerTagOptions = trainertag.trainertags.map((tag) => ({
        label: tag.tag,
        value: tag.tag,
      }));

      setTrainerTagOption(trainnerTagOptions);

      setServiceOptions(options);
    };
    loadService();
  }, []);

  return (
    <div className="bg bg-cubic-gray2 w-full pb-[33px] pt-3 px-8 space-y-4">
      <div className=" flex justify-between">
        <CubicHeadTitle title="TRAINER INFO" />
      </div>

      <div className="grid grid-cols-3 gap-9 w-full">
        <div className="">
          <div className="text-cubic-white text-sm">{`Image (size : 640 x 900 px)`}</div>
          <input
            //   disabled={isView}
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              handlePhotoUpload(e);
            }}
            ref={inputRef}
            accept="image/*, video/*"
          />
          <div
            className="border border-dashed  h-[89px] flex items-center justify-center cursor-pointer"
            onClick={() => inputRef.current.click()}
          >
            <div className="flex items-center justify-center space-x-4">
              <div>
                <UploadIcon />
              </div>
              <div className="text-cubic-white  text-xs">
                Drag and drop images to upload
              </div>
            </div>
          </div>

          <div className=" grid grid-cols-3 gap-2  mt-[6px] w-[300px] h-[136px] ">
            {form.photo.map((photo, index) => {
              const fileType = getFileTypeFromExtension(photo);
              const isVideo = fileType === "video";
              return (
                <div key={index} className="w-24 h-full relative">
                  <Image
                    // className="w-[375px] h-[438px] object-cover "
                    width={160}
                    height={160}
                    style={{ objectFit: "cover" }}
                    src={getImgSrc(photo)}
                    className={cn(isVideo && "hidden", "w-full h-40")}
                    alt="product photo"
                  />
                  <video
                    width={160}
                    height={160}
                    style={{ objectFit: "cover" }}
                    src={getImgSrc(photo)} // Replace this with your video source function or URL
                    controls // Adds video controls like play/pause
                    autoPlay // If you want the video to play automatically
                    loop // To loop the video
                    muted // If you want the video to play muted
                    alt="product video"
                    className={cn(!isVideo && "hidden")}
                  ></video>
                  <div
                    onClick={() => {
                      setForm((prevForm) => {
                        const updatedPhotos = [...prevForm.photo];
                        updatedPhotos.splice(index, 1); // Remove the item at the given index
                        return {
                          ...prevForm,
                          photo: updatedPhotos,
                        };
                      });
                    }}
                    className={cn(
                      " absolute right-0 top-0  cursor-pointer  w-9 h-9 flex items-center justify-center ",
                      photo == "" && "hidden"
                    )}
                  >
                    <YellowBinIcon className={" w-6 h-6  "} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-span-2 grid grid-cols-2 gap-5 items-center w-full">
          <div>
            {" "}
            <CubicInput
              title="Name"
              description="The description must contain a minimum of 30 characters."
              onChange={onChangeInput}
              name="name"
              value={form.name}
            />
          </div>
          <div>
            <CubicInput
              title="Position"
              description="The description must contain a minimum of 30 characters."
              onChange={onChangeInput}
              name="position"
              value={form.position}
            />
          </div>
          <div>
            <CubicInput
              title="Club location"
              description="The description must contain a minimum of 30 characters."
              onChange={onChangeInput}
              name="club_location"
              value={form.club_location}
            />
          </div>
          <div>
            <CubicInput
              title="Spotify link"
              description="The description must contain a minimum of 30 characters."
              onChange={onChangeInput}
              name="spotify_link"
              value={form.spotify_link}
            />
          </div>
          {/* <div>
            <CubicInput
              title="Instagram name"
              description="The description must contain a minimum of 30 characters."
              onChange={onChangeInput}
              name="instagram_name"
              value={form.instagram_name}
            />
          </div> */}

          <div>
            <CubicInput
              title="Instagram link"
              description="The description must contain a minimum of 30 characters."
              onChange={onChangeInput}
              name="instagram_link"
              value={form.instagram_link}
            />
          </div>
          <div className="col-span-2">
            <CubicTextArea
              title="Description (Greeting)"
              description="The description must contain a minimum of 130 characters."
              onChange={onChangeInput}
              name="description"
              value={form.description}
              className="h-[91px]"
            />
          </div>
          <div className="">
            <div
              className={cn(
                "flex  items-center cursor-pointer justify-between"
              )}
            >
              <div className="text-cubic-white  text-sm font-bold  ">
                Trainer Tag
              </div>
              <div>
                <CubicTagDialog isTrainerTag />
              </div>
            </div>
            <div>
              <CubicMultiSelect
                options={trainnerTagOption}
                // text="Trainer Tag"
                value={trainnerTagOption.filter((option) =>
                  form.trainer_tag.includes(option.value)
                )}
                onChange={(selectedOptions) => {
                  // if (selectedOptions.length > 4) return;

                  const selectedValues = selectedOptions.map(
                    (option) => option.value
                  ); // Extract values
                  setForm((prevForm) => ({
                    ...prevForm,
                    trainer_tag: selectedValues, // Store only string values
                  }));
                }}
              />
            </div>
          </div>
          <div className="">
            <CubicMultiSelect
              options={serviceOptions}
              text="Workout Type"
              value={form.workout_type.map((value) => ({
                label: value,
                value,
              }))}
              onChange={(selectedOptions) => {
                // if (selectedOptions.length > 4) return;

                const selectedValues = selectedOptions.map(
                  (option) => option.value
                ); // Extract values
                setForm((prevForm) => ({
                  ...prevForm,
                  workout_type: selectedValues, // Store only string values
                }));
              }}
            />
          </div>

          <div className=" col-span-2 mt-4">
            <div className=" text-cubic-white">Credentials or Experience</div>

            <div className="text-sm text-cubic-gray3 ">
              The description must contain a minimum of 50 characters.
            </div>

            <div className=" flex flex-col space-y-4 mt-2 w-full">
              <div className="flex space-x-2 items-center ">
                <div className={cn("text-cubic-white text-sm font-bold")}>
                  No.1
                </div>
                <div>
                  <CubicSelect
                    options={iconOption}
                    value={form.first_credit_icon}
                    onChange={(value) => {
                      setField("first_credit_icon")(value);
                    }}
                    className="w-full bg-white"
                  />
                </div>
                <div className="w-full">
                  <CubicInput
                    title="No.1"
                    onChange={onChangeInput}
                    name="first_credentials"
                    value={form.first_credentials}
                    className="w-full"
                    classNameTitle="w-full"
                    isFlex
                    noNumber
                  />
                </div>
              </div>

              <div className="flex space-x-2 items-center ">
                <div className={cn("text-cubic-white text-sm font-bold")}>
                  No.2
                </div>
                <div>
                  <CubicSelect
                    options={iconOption}
                    value={form.second_credit_icon}
                    onChange={(value) => {
                      setField("second_credit_icon")(value);
                    }}
                    className="w-full bg-white"
                  />
                </div>
                <div className="w-full">
                  <CubicInput
                    title="No.2"
                    onChange={onChangeInput}
                    name="second_credentials"
                    value={form.second_credentials}
                    className="w-full"
                    classNameTitle="w-9"
                    isFlex
                    noNumber
                  />
                </div>
              </div>

              <div className="flex space-x-2 items-center ">
                <div className={cn("text-cubic-white text-sm font-bold")}>
                  No.3
                </div>
                <div>
                  <CubicSelect
                    options={iconOption}
                    value={form.third_credit_icon}
                    onChange={(value) => {
                      setField("third_credit_icon")(value);
                    }}
                    className="w-full bg-white"
                  />
                </div>
                <div className="w-full">
                  <CubicInput
                    title="No.3"
                    onChange={onChangeInput}
                    name="third_credentials"
                    value={form.third_credentials}
                    className="w-full"
                    classNameTitle="w-9"
                    isFlex
                    noNumber
                  />
                </div>
              </div>

              <div className="flex space-x-2 items-center ">
                <div className={cn("text-cubic-white text-sm font-bold")}>
                  No.4
                </div>
                <div>
                  <CubicSelect
                    options={iconOption}
                    value={form.fourth_credit_icon}
                    onChange={(value) => {
                      setField("fourth_credit_icon")(value);
                    }}
                    className="w-full bg-white"
                  />
                </div>
                <div className="w-full">
                  <CubicInput
                    title="No.4"
                    onChange={onChangeInput}
                    name="fourth_credentials"
                    value={form.fourth_credentials}
                    className="w-full"
                    classNameTitle="w-9"
                    isFlex
                    noNumber
                  />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerForm;
