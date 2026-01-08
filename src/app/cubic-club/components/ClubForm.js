"use client";
import CubicCheckbox from "@/app/components/CubicCheckbox";
import CubicInput from "@/app/components/CubicInput";
import CubicTextArea from "@/app/components/CubicTextArea";
import {
  BinIcon,
  CycleIcon,
  DumbellIcon,
  LockerIcon,
  ParkingIcon,
  RefuelBarIcon,
  RunningMachine,
  SaunaIcon,
  ShowerIcon,
  TwoThunderCafeWhiteIcon,
  UploadIcon,
  WifiIcon,
  YellowBinIcon,
} from "@/app/myicon/myicon";

import { getFileTypeFromExtension, getImgSrc } from "@/app/utils/api.util";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef } from "react";

import provinceEN from "@/lib/json/changwats/en.json";
import CubicSelect from "@/app/components/CubicSelect";
import { CubicHeadTitle } from "@/app/components/CubicHeadTitle";

const provinceOptions = provinceEN.en.changwats
  .map((province) => ({
    label: province.name,
    value: province.name,
  }))
  .sort((a, b) => {
    if (a.label === "Bangkok") return -1; // Bangkok stays first
    if (b.label === "Bangkok") return 1;
    return a.label.localeCompare(b.label, "en", { sensitivity: "base" });
  });

const ClubForm = ({ form, setForm, onChangeInput, setField }) => {
  const inputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      photo: [...prevForm.photo, e.target.files[0]],
    }));
  };
  return (
    <div className="bg bg-cubic-gray2 w-full h-full pt-4 pb-[33px] px-8 space-y-4">
      <CubicHeadTitle title="CLUB INFO" />

      <div className="grid grid-cols-3 gap-0 w-full">
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
            className=" mt-[6px] border border-dashed w-[300px] h-[89px] flex items-center justify-center cursor-pointer"
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

          <div className="grid grid-cols-2 gap-2 mt-[14px] w-[300px] h-[86px]">
            {form.photo.map((photo, index) => {
              const fileType = getFileTypeFromExtension(photo);
              const isVideo = fileType === "video";
              return (
                <div key={index} className="w-[147px] h-full  relative">
                  <Image
                    // className="w-[375px] h-[438px] object-cover "
                    width={160}
                    height={160}
                    style={{ objectFit: "cover" }}
                    src={getImgSrc(photo)}
                    className={cn(isVideo && "hidden", "w-full h-[86px] ")}
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

        <div className="col-span-2 grid grid-cols-2 gap-2.5 w-full">
          <div>
            {" "}
            <CubicInput
              title="Location Name"
              description="The description must contain a minimum of 15 characters."
              onChange={onChangeInput}
              name="location_name"
              value={form.location_name}
            />
          </div>
          <div>
            <CubicInput
              title="Phone number"
              // description="The description must contain a minimum of 30 characters."
              onChange={onChangeInput}
              name="phone"
              value={form.phone}
            />
          </div>

          <div className="grid grid-cols-4 col-span-2 gap-2.5">
            <div>
              <div className="text-cubic-white  text-sm font-bold mb-[6px] ">
                Province
              </div>
              <CubicSelect
                title="Province"
                options={provinceOptions}
                value={form.province}
                onChange={(value) => {
                  setField("province")(value);
                }}
                overwriteClass="h-[40px] rounded-none w-full"
              />
            </div>
            <div>
              <CubicInput
                title="Postal Code"
                onChange={onChangeInput}
                name="postal"
                value={form.postal}
              />
            </div>
            <div>
              <CubicInput
                title="District"
                onChange={onChangeInput}
                name="district"
                value={form.district}
              />
            </div>
            <div>
              <CubicInput
                title="Sub-district"
                onChange={onChangeInput}
                name="sub_district"
                value={form.sub_district}
              />
            </div>
          </div>

          <div className="col-span-2">
            <CubicTextArea
              title="Address"
              onChange={onChangeInput}
              name="address"
              value={form.address}
              className="h-[91px]"
              // description="The description must contain a minimum of 30 characters."
            />
          </div>
          <div className="col-span-2">
            <CubicInput
              title="Link Map"
              onChange={onChangeInput}
              name="link_map"
              value={form.link_map}
              // description="The description must contain a minimum of 30 characters."
            />
          </div>
          <div className="text-cubic-white text-sm col-span-2">
            Feature Bullet
          </div>
          <div className=" mt-[14px] col-span-2 grid grid-cols-4 gap-2.5 items-center">
            <div>
              <CubicCheckbox
                label="Shower & Toiletries"
                checked={form.shower_room}
                onCheckedChange={(checked) => {
                  setField("shower_room")(checked);
                }}
                className={"text-cubic-white  bg bg-cubic-white w-6 h-6"}
                icon={<ShowerIcon />}
              />
            </div>

            <div>
              <CubicCheckbox
                label="Locker Room"
                checked={form.locker_room}
                onCheckedChange={(checked) => {
                  setField("locker_room")(checked);
                }}
                className={"text-cubic-white  bg bg-cubic-white w-6 h-6"}
                icon={<LockerIcon />}
              />
            </div>

            <div>
              <CubicCheckbox
                label="Free WIFI"
                checked={form.wifi}
                onCheckedChange={(checked) => {
                  setField("wifi")(checked);
                }}
                className={"text-cubic-white  bg bg-cubic-white w-6 h-6"}
                icon={<WifiIcon />}
              />
            </div>

            <div>
              <CubicCheckbox
                // label="Refuel Bar"
                label="TWO THUNDER CAFE"
                checked={form.refuel_bar}
                onCheckedChange={(checked) => {
                  setField("refuel_bar")(checked);
                }}
                className={"text-cubic-white  bg bg-cubic-white w-6 h-6"}
                icon={<TwoThunderCafeWhiteIcon />}
              />
            </div>

            <div>
              <CubicCheckbox
                label="Parking"
                checked={form.parking}
                onCheckedChange={(checked) => {
                  setField("parking")(checked);
                }}
                className={"text-cubic-white  bg bg-cubic-white w-6 h-6"}
                icon={<ParkingIcon />}
              />
            </div>

            <div className="flex items-center space-x-2">
              <div>
                <CubicCheckbox
                  checked={form.free_boolean3}
                  onCheckedChange={(checked) => {
                    setField("free_boolean3")(checked);
                  }}
                  className={"text-cubic-white  bg bg-cubic-white w-6 h-6"}
                  icon={<DumbellIcon />}
                />
              </div>
              <div>
                <CubicInput
                  onChange={onChangeInput}
                  name="free_text3"
                  value={form.free_text3}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div>
                <CubicCheckbox
                  checked={form.free_boolean1}
                  onCheckedChange={(checked) => {
                    setField("free_boolean1")(checked);
                  }}
                  className={"text-cubic-white  bg bg-cubic-white w-6 h-6"}
                  icon={<CycleIcon />}
                />
              </div>
              <div>
                <CubicInput
                  onChange={onChangeInput}
                  name="free_text1"
                  value={form.free_text1}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div>
                <CubicCheckbox
                  checked={form.free_boolean2}
                  onCheckedChange={(checked) => {
                    setField("free_boolean2")(checked);
                  }}
                  className={"text-cubic-white  bg bg-cubic-white w-6 h-6"}
                  icon={<RunningMachine />}
                />
              </div>
              <div>
                <CubicInput
                  onChange={onChangeInput}
                  name="free_text2"
                  value={form.free_text2}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubForm;
