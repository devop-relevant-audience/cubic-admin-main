"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0    focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gymx-blue data-[state=checked]:text-[#f8f8f8]",

      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        "flex items-center justify-center text-current text-[#0f0f0e]"
      )}
    >
      <svg
        width="13"
        height="10"
        viewBox="0 0 13 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 5.00001L4.53553 8.53554L11.6066 1.46448"
          stroke="#0F0F0E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* <Check className="h-4 w-4" /> */}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
