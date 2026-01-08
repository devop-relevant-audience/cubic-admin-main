import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const CubicTextArea = ({
  placeholder = "",
  value = "",
  onChange = () => {},
  disabled = false,
  className = "",
  title = "",
  description = "",
  ...props
}) => {
  return (
    <div className=" flex flex-col space-y-[6px]">
      <div className="text-cubic-white text-sm font-bold ">{title}</div>
      <div>
        {" "}
        <Textarea
          {...props}
          className={cn(
            "w-full h-[91px] text-[#424242] rounded-none placeholder:text-[#999999] text-sm bg bg-cubic-white",
            className
          )}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
      <div className="text-cubic-gray3 text-sm font-normal">{description}</div>
    </div>
  );
};

export default CubicTextArea;
