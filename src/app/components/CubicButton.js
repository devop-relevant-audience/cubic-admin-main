"use client";
import { cn } from "@/lib/utils";

const CubicButton = ({
  text = "",
  overWriteClassName,
  isYellow = false,
  icon = "",
  onClick = () => {},
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center cursor-pointer w-[160px] h-[48px] space-x-2 font-BebasNeue text-2xl  group curso ",
        isYellow
          ? " bg bg-cubic-yellow "
          : "  bg bg-blackborder border  border-cubic-yellow",

        overWriteClassName
      )}
      onClick={onClick}
    >
      <div>{icon}</div>
      <div
        className={cn(
          "text-cubic-yellow",
          isYellow && "text-cubic-black",
          "group-hover:scale-105 duration-200 transition-all"
        )}
      >
        {text}
      </div>
    </div>
  );
};

export const ClearButton = ({ text = "", onClick = () => {} }) => {
  return (
    <button
      onClick={onClick}
      className="w-[81px] h-[21px] px-2.5 py-0.5 border border-[#cfcfcf] text-[#cfcfcf]  hover:border-cubic-yellow hover:text-cubic-yellow duration-300 flex-col justify-center items-center gap-2.5 inline-flex overflow-hidden"
    >
      <div className="justify-center items-center gap-1 inline-flex">
        <div className="justify-center items-center gap-1 flex">
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.31429 3.46348C5.82179 3.31181 6.38179 3.21265 7.00013 3.21265C9.79429 3.21265 12.0576 5.47598 12.0576 8.27015C12.0576 11.0643 9.79429 13.3276 7.00013 13.3276C4.20596 13.3276 1.94263 11.0643 1.94263 8.27015C1.94263 7.23181 2.25763 6.26348 2.79429 5.45848"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.59033 3.60341L6.27617 1.66675"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.59033 3.60352L6.55617 5.03852"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className=" text-sm font-normal">Clear</div>
        </div>
      </div>
    </button>
  );
};

export const SaveButton = ({ text = "", onClick = () => {} }) => {
  return (
    <button
      onClick={onClick}
      className="w-[82px] h-[21px] px-2.5 py-0.5 bg-[#127ae9] hover:bg-blue-500 text-white  duration-300 flex-col justify-center items-center gap-2.5 inline-flex overflow-hidden "
    >
      <div className="justify-center items-center gap-1 inline-flex">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5833 12.75H3.41667C3.10725 12.75 2.8105 12.6271 2.59171 12.4083C2.37292 12.1895 2.25 11.8928 2.25 11.5833V3.41667C2.25 3.10725 2.37292 2.8105 2.59171 2.59171C2.8105 2.37292 3.10725 2.25 3.41667 2.25H9.83333L12.75 5.16667V11.5833C12.75 11.8928 12.6271 12.1895 12.4083 12.4083C12.1895 12.6271 11.8928 12.75 11.5833 12.75Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.4166 12.7499V8.08325H4.58325V12.7499"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.25 5.16675H5.75"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className=" text-sm font-normal ">Save</div>
      </div>
    </button>
  );
};

export const DeleteButton = ({ text = "", onClick = () => {} }) => {
  return (
    <button
      onClick={onClick}
      className="w-[82px] h-[21px] px-2.5 py-0.5 bg-[#be1219]  text-white hover:bg-red-500 duration-300 flex-col justify-center items-center gap-2.5 inline-flex overflow-hidden"
    >
      <div className="justify-center items-center gap-1 inline-flex">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.49992 4.58333V3.3C5.49992 3.02152 5.60528 2.75445 5.79281 2.55754C5.98035 2.36062 6.2347 2.25 6.49992 2.25H8.49992C8.76514 2.25 9.01949 2.36062 9.20703 2.55754C9.39456 2.75445 9.49992 3.02152 9.49992 3.3V4.58333M2.83325 4.58333H12.1666M6.33325 6.91667V9.83333M8.66659 6.91667V9.83333M11.5833 4.58333L10.9999 11.7C10.9999 11.9785 10.8946 12.2455 10.707 12.4425C10.5195 12.6394 10.2651 12.75 9.99992 12.75H4.99992C4.7347 12.75 4.48035 12.6394 4.29281 12.4425C4.10528 12.2455 3.99992 11.9785 3.99992 11.7L3.41659 4.58333H11.5833Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className=" text-sm font-normal ">Delete</div>
      </div>
    </button>
  );
};

export default CubicButton;
