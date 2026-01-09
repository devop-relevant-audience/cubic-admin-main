import UploadDisplayPhoto from "@/app/components/UploadDisplayPhoto";
import { BinIcon } from "@/app/myicon/myicon";
import { useEffect } from "react";
import useBanner from "../hooks/useBanner";
import { DeleteButton, SaveButton } from "@/app/components/CubicButton";

const CubicBannerForm = ({ bannerData, index, bannerForm, setBannerForm }) => {
  const bannerService = useBanner();

  const {
    form,
    setForm,
    onCreateHeroBanner,
    onUpdateHeroBanner,
    onDeleteHeroBanner,
  } = bannerService;

  useEffect(() => {
    setForm(bannerData);
  }, [bannerData]);

  const handleRemoveForm = () => {
    if (form.isNew) {
      const updatedBannerData = [...bannerForm];
      updatedBannerData.splice(index, 1);
      setBannerForm(updatedBannerData);
    } else {
      onDeleteHeroBanner();
    }
  };

  return (
    <div className="bg bg-cubic-gray2 w-full h-[456px] pt-[18px] px-[22px] space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 items-center ">
          <div className="text-gymx-blue text-[32px] font-BebasNeue">{`#${
            index + 1
          }`}</div>
          <div className="text-cubic-white text-sm leading-tight ">{`Upload JPEG, mp4, PNG. (Videos must be under 50 MB.)`}</div>
        </div>
        <div className="flex space-x-3 items-center ">
          <DeleteButton onClick={handleRemoveForm} />

          <SaveButton
            onClick={form.isNew ? onCreateHeroBanner : onUpdateHeroBanner}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 space-x-[19px] ">
        <div className=" col-span-9">
          <UploadDisplayPhoto
            form={form}
            setForm={setForm}
            value={form.desktop_photo}
            overWriteClassName="w-full h-full"
            name="desktop_photo"
            photoDesctiption=" Banner for desktop (size : 1440 x 900 px)"
          />
        </div>
        <div className=" col-span-3">
          <UploadDisplayPhoto
            form={form}
            setForm={setForm}
            value={form.mobile_photo}
            overWriteClassName=" w-full h-full "
            name="mobile_photo"
            photoDesctiption="Banner for mobile (size : 375 x 812 px)"
          />
        </div>
      </div>
    </div>
  );
};

export default CubicBannerForm;
