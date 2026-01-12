"use client";
import CubicButton from "@/app/components/CubicButton";
import CubicInput from "@/app/components/CubicInput";
import CubicTextArea from "@/app/components/CubicTextArea";
import { BlackXicon, PlusIcon } from "@/app/myicon/myicon";
import { cn } from "@/lib/utils";
import CubicTagDialog from "../components/CubicTagDialog";
import CubicSelect from "@/app/components/CubicSelect";
import UploadDisplayPhoto from "@/app/components/UploadDisplayPhoto";
import ClassForm from "./ClassForm";
import CubicMultiSelect from "@/app/components/CubicMulitiSelect";
import CubicCheckbox from "@/app/components/CubicCheckbox";
import { CubicHeadTitle } from "@/app/components/CubicHeadTitle";

const serviceTagOption = [
  { value: "cycle", label: "CYCLE" },
  { value: "hiit", label: "HIIT" },
  { value: "training", label: "TRAINING" },
  { value: "recover", label: "RECOVER" },
  { value: "pilates", label: "PILATES" },
];

const ServiceForm = ({ form, setForm, onChangeInput, tagOption, setField }) => {
  return (
    <div className=" flex flex-col space-y-6">
      <div className=" bg-cubic-gray2 w-full pb-11 pt-3 px-8 space-y-4">
        <CubicHeadTitle
          title="Card in home page"
          classNameText={"text-[32px]"}
        />

        <div className="text-base text-cubic-white underline">Image</div>
        <div className="flex space-x-4">
          <div>
            <UploadDisplayPhoto
              form={form}
              setForm={setForm}
              value={form.card_home_desktop}
              overWriteClassName="w-[230px] h-[246px]"
              borderClassName="w-[230px] h-[246px]"
              name="card_home_desktop"
              photoDesctiption="Size : 720 x 480 px"
            />
          </div>
          <div>
            <UploadDisplayPhoto
              form={form}
              setForm={setForm}
              value={form.card_home_mobile}
              overWriteClassName="w-[180px] h-[246px]"
              borderClassName="w-[180px] h-[246px]"
              name="card_home_mobile"
              photoDesctiption="Size : 562 x 375 px"
            />
          </div>
        </div>
      </div>

      <div className=" bg-cubic-gray2 w-full pb-11 pt-3 px-8 space-y-4">
        <CubicHeadTitle title="THUMBNAIL" classNameText={"text-[32px]"} />
        {/* <div className="flex space-x-4  items-center ">
          <div className="bg-white w-2 h-2 rounded-full"></div>
          <div className="text-cubic-white text-[32px]">Thumbnail</div>
        </div> */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <CubicTextArea
              title="Service Title"
              description="The description must contain a minimum of 50 characters."
              onChange={onChangeInput}
              name="thumbnail_title"
              value={form.thumbnail_title}
            />
          </div>
          <div>
            <CubicTextArea
              title="Description"
              description="The description must contain a minimum of 100 characters."
              onChange={onChangeInput}
              name="thumbnail_description"
              value={form.thumbnail_description}
            />
          </div>

          <div className=" col-span-2 grid grid-cols-2 gap-8">
            <div>
              <div
                className={cn(
                  "flex  items-center cursor-pointer justify-between mb-[6px] "
                )}
              >
                <div className="text-cubic-white  text-sm font-bold ">Tag</div>
                <div>
                  <CubicTagDialog />
                </div>
              </div>
              <div className={cn("relative")}>
                <CubicSelect
                  overwriteClass="w-full"
                  placeholder="ระบุ"
                  options={tagOption}
                  value={form.thumbnail_tag}
                  onChange={(selectedOption) => {
                    setForm((prevForm) => ({
                      ...prevForm,
                      thumbnail_tag: selectedOption,
                    }));
                  }}
                />
                <div
                  className={cn("cursor-pointer absolute top-2 right-9")}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setForm((prevForm) => ({
                      ...prevForm,
                      thumbnail_tag: "",
                    }));
                  }}
                >
                  <BlackXicon />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-full text-white text-base font-bold font-Inter border-b border-gymx-blue pb-3 w-fit h-5 -mb-4">
            Image
          </div>
          <UploadDisplayPhoto
            form={form}
            setForm={setForm}
            value={form.thumbnail_desktop}
            overWriteClassName="w-full h-[246px]"
            name="thumbnail_desktop"
            photoDesctiption="Size : 640 x 900 px"
          />
          <div className="w-[269px]">
            <UploadDisplayPhoto
              form={form}
              setForm={setForm}
              value={form.thumbnail_mobile}
              overWriteClassName="w-full"
              name="thumbnail_mobile"
              photoDesctiption="size : 480 x 720 px"
            />
          </div>
        </div>
      </div>

      {/* Work out template */}
      <div className=" bg-cubic-gray2 w-full pb-11 pt-[25px] px-8  space-y-4">
        <div className="text-center text-gymx-blue text-5xl font-normal font-BebasNeue">
          workout template
        </div>

        {/* Hero Banner Section */}

        <CubicHeadTitle
          title="HERO BANNER"
          color="bg-gymx-blue"
          classNameText={"text-[32px] text-gymx-blue"}
        />

        <div className="grid grid-cols-2 gap-8 mb-[56px]">
          <div>
            <CubicInput
              title="Name"
              description={cn(
                form.banner_name.length > 20
                  ? "Text too long, Name Card should not longer than 20 characters"
                  : "The description must contain a minimum of 20 characters."
              )}
              onChange={onChangeInput}
              name="banner_name"
              value={form.banner_name}
              className={cn(form.banner_name.length > 20 && "bg-red-200")}
              classNameWarning={cn(
                form.banner_name.length > 20 && "text-red-500"
              )}
            />
          </div>

          <div>
            <CubicMultiSelect
              text="Service tag"
              //   description="The description must contain a minimum of 20 characters."
              options={serviceTagOption}
              value={serviceTagOption.filter((option) =>
                form.banner_tag.includes(option.value)
              )}
              onChange={(selectedOption) => {
                const selectedValues = selectedOption.map(
                  (option) => option.value
                );

                setForm((prevForm) => ({
                  ...prevForm,
                  banner_tag: selectedValues,
                }));
              }}
            />
          </div>

          <div className="text-cubic-white  underline col-span-2 -mb-4 ">
            Upload video or image
          </div>
          <UploadDisplayPhoto
            form={form}
            setForm={setForm}
            value={form.banner_desktop}
            overWriteClassName="w-full h-[246px]"
            name="banner_desktop"
            photoDesctiption="For Desktop (size : 1440 x 640 px)"
          />
          <UploadDisplayPhoto
            form={form}
            setForm={setForm}
            value={form.banner_mobile}
            overWriteClassName="w-[180px]  h-[246px]"
            name="banner_mobile"
            photoDesctiption="  For Mobile (size : 375 x 560 px)"
          />
        </div>

        {/* FEATURE SECTION */}

        <CubicHeadTitle
          title="Feature Section"
          color="bg-gymx-blue"
          classNameText={"text-[32px] text-gymx-blue"}
        />

        <div className="grid grid-cols-2 gap-8 mb-[56px]">
          <div className="">
            <CubicTextArea
              title="Headline"
              description="The description must contain a minimum of 50 characters."
              onChange={onChangeInput}
              name="headline"
              value={form.headline}
              className="h-[280px]"
            />
          </div>

          <div className="space-y-6">
            <div>
              <CubicInput
                title="Sub headline"
                description="The description must contain a minimum of 32 characters."
                onChange={onChangeInput}
                name="sub_headline"
                value={form.sub_headline}
              />
            </div>
            <div>
              <CubicTextArea
                title="Description"
                description="The description must contain a minimum of 200 characters."
                onChange={onChangeInput}
                name="banner_description"
                value={form.banner_description}
                className="h-[171px]"
              />
            </div>
          </div>
        </div>

        {/* CLASSES SECTION */}

        <div className=" flex space-x-4">
          <div className="flex space-x-4  items-center ">
            <div className="bg-gymx-blue w-2 h-2 rounded-full"></div>
            <div className="text-gymx-blue  text-2xl">CLASSES</div>
          </div>
          <div>
            <CubicCheckbox
              label="Hide section"
              checked={form.hide_class}
              onCheckedChange={(checked) => {
                setField("hide_class")(checked);
              }}
              className={
                "text-cubic-white  bg bg-cubic-white w-6 h-6 rounded-full"
              }
              // icon={<SaunaIcon />}
              isIcon={false}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 mb-[56px]">
          {form.classes.map((item, index) => (
            <div key={index}>
              <ClassForm
                classData={item}
                index={index}
                setForm={setForm}
                form={form}
              />
            </div>
          ))}
          <div className="border border-dashed border-cubic-white w-[294px] h-[570px] flex items-center justify-center">
            <div className="flex">
              <CubicButton
                text="ADD CLASS"
                icon={<PlusIcon />}
                onClick={() => {
                  setForm((prevForm) => ({
                    ...prevForm,
                    classes: [
                      ...prevForm.classes,
                      {
                        class_name: "",
                        duration: "",
                        class_description: "",
                        class_photo: "",
                        isNew: true,
                      },
                    ],
                  }));
                }}
              />
            </div>
          </div>
        </div>

        {/* VIDEOS SECTION */}

        <CubicHeadTitle
          title="video section"
          color="bg-gymx-blue"
          classNameText={"text-[32px] text-gymx-blue"}
        />

        <div className="grid grid-cols-2 gap-8">
          <div className="text-cubic-white  underline col-span-2 -mb-4">
            Upload video or image
          </div>
          <UploadDisplayPhoto
            form={form}
            setForm={setForm}
            value={form.video_desktop}
            overWriteClassName="w-full h-[246px]"
            name="video_desktop"
            photoDesctiption=" For Desktop (size : 1440 x 640 px)"
          />
          {/* <div>
            <div className="text-sm  text-cubic-white">
              For Mobile (size : 375 x 560 px)
            </div>
            <div>
              <UploadDisplayPhoto
                form={form}
                setForm={setForm}
                value={form.video_mobile}
                overWriteClassName="w-full h-full"
                name="video_mobile"
                photoDesctiption=" For Mobile (size : 375 x 560 px)"
              />
            </div>
          </div>{" "} */}
        </div>

        {/* GALLERY SECTION */}

        <CubicHeadTitle
          title="Image Gallery "
          color="bg-gymx-blue"
          classNameText={"text-[32px] text-gymx-blue"}
        />

        <div className="grid grid-cols-3 gap-4">
          <UploadDisplayPhoto
            form={form}
            setForm={setForm}
            value={form.first_gallery}
            overWriteClassName="w-[390px] h-[255px]"
            name="first_gallery"
            photoDesctiption="size : 612 x 400 px"
          />
          <UploadDisplayPhoto
            form={form}
            setForm={setForm}
            value={form.second_gallery}
            overWriteClassName="w-[390px] h-[255px]"
            name="second_gallery"
            photoDesctiption="size : 612 x 400 px"
          />
          <UploadDisplayPhoto
            form={form}
            setForm={setForm}
            value={form.third_gallery}
            overWriteClassName="w-[390px] h-[255px]"
            name="third_gallery"
            photoDesctiption="size : 612 x 400 px"
          />
          <UploadDisplayPhoto
            form={form}
            setForm={setForm}
            value={form.fourth_gallery}
            overWriteClassName="w-[390px] h-[255px]"
            name="fourth_gallery"
            photoDesctiption="size : 612 x 400 px"
          />

          <UploadDisplayPhoto
            form={form}
            setForm={setForm}
            value={form.fifth_gallery}
            overWriteClassName="w-[390px] h-[255px]"
            name="fifth_gallery"
            photoDesctiption="size : 612 x 400 px"
          />
          <UploadDisplayPhoto
            form={form}
            setForm={setForm}
            value={form.sixth_gallery}
            overWriteClassName="w-[390px] h-[255px]"
            name="sixth_gallery"
            photoDesctiption="size : 612 x 400 px"
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;
