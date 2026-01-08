import { getFileTypeFromExtension, getImgSrc } from "@/app/utils/api.util";
import { DELETE_ICON, ICON_UPLOAD_PHOTO } from "@/lib/svg";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef } from "react";

const UploadDisplayPhoto = ({
  form,
  setForm = () => {},
  setField,
  onChangeInput,
  index,
  onClick = () => {},
  name,
  value,
  borderClassName = "",
  overWriteClassName = "",
  photoDesctiption = "  Upload JPEG, PNG, MP4. (size : 536 x 356 px)",
  objectFit = "cover",
}) => {
  const inputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: e.target.files[0],
    }));
  };

  // const handlePhotoUploadForArrayInForm = (e) => {
  //   setForm((prevForm) => {
  //     const updatedClasses = [...prevForm.classes]; // Clone array
  //     updatedClasses[index] = {
  //       ...updatedClasses[index],
  //       [name]: e.target.files[0],
  //     }; // Update specific class

  //     return { ...prevForm, classes: updatedClasses }; // Update form state
  //   });
  // };

  const fileType = getFileTypeFromExtension(value);

  const isVideo = fileType === "video";

  return (
    <div>
      <div className="text-sm  text-cubic-white pb-4">{photoDesctiption}</div>
      <div
        // className={cn(
        //   "border-[1px] border-dashed border-waraporn-lightgray w-[274px] h-[274px] flex items-center justify-center relative overflow-hidden ",
        //   overWriteClassName
        // )}
        style={{
          backgroundImage: `url(
            "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23FFFFFF' strokeWidth='2' strokeDasharray='4%2c 10' strokeDashoffset='0' strokeLinecap='square'/%3e%3c/svg%3e"
          )`,
        }}
        className={cn("p-1 h-[320px] relative", borderClassName)}
      >
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
        <Image
          width={300}
          height={300}
          style={{ objectFit: objectFit }}
          src={getImgSrc(value)}
          className={cn(
            value == "" && "hidden",
            isVideo && "hidden",
            !value && "hidden",
            " h-[274px] w-[274px]   ",
            overWriteClassName
          )}
          alt="image hero"
        />
        <video
          width={300}
          height={300}
          style={{ objectFit: "contain" }}
          src={getImgSrc(value)} // Replace this with your video source function or URL
          controls // Adds video controls like play/pause
          autoPlay // If you want the video to play automatically
          loop // To loop the video
          muted // If you want the video to play muted
          alt="video hero"
          className={cn(
            !isVideo && "hidden",
            "h-[274px] w-[274px] ",
            overWriteClassName
          )}
        ></video>
        <div
          className={cn(
            "flex justify-center items-center space-x-2 cursor-pointer h-[320px]",
            value !== "" && "hidden"
          )}
          onClick={() => {
            inputRef.current.click();
          }}
        >
          {/* <div>
            <Image
              width={200}
              height={200}
              src={"/gallery_add_gray.png"}
              alt="add"
              className="w-[24px] h-[24px]"
            />
          </div> */}
          <ICON_UPLOAD_PHOTO className="w-5 h-5 text-white " />
          <div className="text-white text-xs font-normal">Upload Photo</div>
        </div>
        <div
          onClick={() => {
            setForm({ ...form, [name]: "" });
            // setForm({ ...form, [name]: "" });
          }}
          className={cn(
            " absolute right-2 top-1 mt-2 ml-2 cursor-pointer  w-9 h-9 flex items-center justify-center ",
            value == "" && "hidden",
            !value && "hidden"
          )}
        >
          <DELETE_ICON
            className={" w-5 h-5  hover:text-lezzon-red duration-100 "}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadDisplayPhoto;
