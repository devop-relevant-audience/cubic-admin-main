"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const CubicSelect = ({
  options = [],
  value,
  onChange = () => {},
  disabled = false,
  error = false,
  placeholder = "",
  className = "normal-case bg bg-white",
  overwriteClass = " w-full rounded-md  h-[30px] 3xl:h-[40px]  ",
  fontSize = "text-xs xl:text-sm",
  mandatory = false,
  icon,
  onOpenChange = () => {},
}) => {
  return (
    <Select
      onValueChange={onChange}
      value={value}
      disabled={disabled}
      onOpenChange={onOpenChange}
    >
      <SelectTrigger
        icon={icon}
        className={cn(
          overwriteClass,
          fontSize,
          className,
          disabled && "!cursor-default",
          (error || (mandatory && !value)) &&
            " border border-dt-red-01 focus:ring-dt-red-01"
        )}
      >
        <SelectValue
          className="placeholder:text-red-500"
          placeholder={placeholder}
        />
      </SelectTrigger>
      <SelectContent className="">
        <SelectGroup>
          {options.map((item, index) => {
            return (
              <SelectItem key={index} value={item.value}>
                {item.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CubicSelect;
