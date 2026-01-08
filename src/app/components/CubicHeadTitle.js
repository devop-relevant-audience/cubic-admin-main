import { cn } from "@/lib/utils";

export const CubicHeadTitle = ({ title = "", classNameText, color = "" }) => {
  return (
    <div className="flex space-x-4  items-center ">
      <div className={cn("bg-white w-2 h-2 rounded-full", color)}></div>
      <div className={cn("text-2xl font-BebasNeue text-white", classNameText)}>
        {title}
      </div>
    </div>
  );
};
