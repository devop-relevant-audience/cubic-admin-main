import Image from "next/image";

export const ICON_UPLOAD_PHOTO = ({ className = "", strokeWidth = "1.5" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.50016 8.33333C8.42064 8.33333 9.16683 7.58714 9.16683 6.66667C9.16683 5.74619 8.42064 5 7.50016 5C6.57969 5 5.8335 5.74619 5.8335 6.66667C5.8335 7.58714 6.57969 8.33333 7.50016 8.33333Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.8332 1.66663H7.49984C3.33317 1.66663 1.6665 3.33329 1.6665 7.49996V12.5C1.6665 16.6666 3.33317 18.3333 7.49984 18.3333H12.4998C16.6665 18.3333 18.3332 16.6666 18.3332 12.5V8.33329"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.125 4.16663H17.7083"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M15.4165 6.45833V1.875"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M2.2251 15.7913L6.33343 13.033C6.99176 12.5913 7.94176 12.6413 8.53343 13.1496L8.80843 13.3913C9.45843 13.9496 10.5084 13.9496 11.1584 13.3913L14.6251 10.4163C15.2751 9.85798 16.3251 9.85798 16.9751 10.4163L18.3334 11.583"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const DELETE_ICON = ({ className, onClick }) => {
  return (
    <Image
      width={32}
      height={32}
      // style={{ objectFit: "cover" }}
      src={"/delete.png"}
      // className={cn(value == "" && "hidden", " h-[300px] w-fit p-3  ")}
      alt="delete"
    />
  );
};
