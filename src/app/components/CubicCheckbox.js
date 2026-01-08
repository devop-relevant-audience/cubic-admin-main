import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const CubicCheckbox = ({
  label,
  checked,
  onChange,
  className,
  onCheckedChange,
  icon,
  labelClassName = "text-cubic-white text-sm",
  isIcon = true,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        //   label={label}
        checked={checked}
        onChange={onChange}
        className={className}
        onCheckedChange={onCheckedChange}
      />
      <div
        className={cn("flex items-center space-x-2", !isIcon && "space-x-0")}
      >
        <div className={cn("", !isIcon && "hidden")}>{icon}</div>
        <div className={labelClassName}>{label}</div>
      </div>
    </div>
  );
};

export default CubicCheckbox;
