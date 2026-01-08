import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const CubicInput = ({
  placeholder = "",
  value = "",
  onChange = () => {},
  disabled = false,
  className = "",
  title = "",
  description = "",
  isFlex = false,
  classNameTitle = "",
  classNameWarning = "",
  noNumber = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        " flex flex-col space-y-[6px] w-full space-x-0",
        isFlex && "flex flex-row space-y-0  items-center  space-x-3 w-full "
      )}
    >
      <div
        className={cn(
          "text-cubic-white text-sm font-bold",
          classNameTitle,
          noNumber && "hidden"
        )}
      >
        {title}
      </div>
      <Input
        {...props}
        className={cn(
          "h-10 pl-3 pr-14 py-2 bg-white border border-slate-300",
          className
        )}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      <div
        className={cn(
          "text-cubic-gray3 text-sm font-normal leading-tight",
          classNameWarning
        )}
      >
        {description}
      </div>
    </div>
  );
};

export default CubicInput;
