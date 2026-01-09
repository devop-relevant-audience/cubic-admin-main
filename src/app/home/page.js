"use client";

import { useEffect, useState } from "react";
import CubicButton, {
  ClearButton,
  SaveButton,
} from "../components/CubicButton";
import CubicInput from "../components/CubicInput";
import CubicTextArea from "../components/CubicTextArea";
import { BinIcon, PlusIcon } from "../myicon/myicon";
import CubicBannerForm from "./components/CubicBannerForm";
import useBanner from "./hooks/useBanner";
import useSeo from "./hooks/useSeo";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { cubicApi } from "../utils/path.util";
import { CubicHeadTitle } from "../components/CubicHeadTitle";

const HomePage = () => {
  const router = useRouter();
  const seoService = useSeo();

  const seoForm = seoService.form;
  const seoOnchangeInput = seoService.onChangeInput;

  const [bannerForm, setBannerForm] = useState([]);

  useEffect(() => {
    const loadSeoData = async () => {
      const { data: seoData } = await cubicApi.get("/seo");
      seoService.setForm(seoData.seos[0]);
    };
    const loadBannerData = async () => {
      const { data: bannerData } = await cubicApi.get("/banner");
      setBannerForm(bannerData.banners);
    };
    loadBannerData();
    loadSeoData();
  }, []);

  return (
    <div
      className={cn(
        " w-full h-full    bg bg-cubic-black pt-4 px-16 ",
        bannerForm.length === 0 && "h-screen"
      )}
    >
      <div className="flex justify-between mb-[18px] w-full">
        <div className="text-cubic-yellow text-5xl font-BebasNeue">HOME</div>
        <div className="flex  space-x-4">
          {/* <div>
            <CubicButton text="CANCEL" onClick={() => router.push("/home")} />
          </div> */}
          {/* <div>
            <CubicButton
              text="SAVE"
              isYellow={true}
              onClick={() => {
                seoService.onUpdateHeroBanner();
              }}
            />
          </div> */}
        </div>
      </div>

      <div className="bg bg-cubic-gray2 w-full h-[336px] pt-4 pb-[23px] space-y-4">
        <div className="flex justify-between items-center px-6">
          <CubicHeadTitle title="SEO" />
          <div className="flex space-x-3 items-center ">
            <ClearButton
              onClick={() => {
                seoService.setField("title")("");
                seoService.setField("slug")("");
                seoService.setField("description")("");
              }}
            />
            <SaveButton onClick={seoService.onUpdateHeroBanner} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 px-[42px] ">
          <div>
            <CubicInput
              title="Title"
              description="The description must contain a minimum of 500 characters."
              onChange={seoOnchangeInput}
              name="title"
              value={seoForm.title}
            />
          </div>
          <div>
            <CubicInput
              title="Slug"
              description="The description must contain a minimum of 500 characters."
              onChange={seoOnchangeInput}
              name="slug"
              value={seoForm.slug}
            />
          </div>
          <div className="col-span-2">
            <CubicTextArea
              title="Description"
              description="The description must contain a minimum of 500 characters."
              onChange={seoOnchangeInput}
              name="description"
              value={seoForm.description}
            />
          </div>
        </div>
      </div>

      <div className="flex  items-center space-x-4 mt-[46px] mb-[18px]">
        <CubicHeadTitle title="Banner" classNameText={"text-[32px]"} />

        <CubicButton
          onClick={() =>
            setBannerForm([
              ...bannerForm,
              {
                desktop_photo: "",
                mobile_photo: "",
                isNew: true,
              },
            ])
          }
          text="ADD BANNER"
          icon={<PlusIcon />}
        />
      </div>
      {bannerForm.map((item, index) => (
        <CubicBannerForm
          key={index}
          index={index}
          bannerData={item}
          setBannerForm={setBannerForm}
          bannerForm={bannerForm}
        />
      ))}
    </div>
  );
};

export default HomePage;
