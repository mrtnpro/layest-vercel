import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  trimValueOnBlur?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, trimValueOnBlur, ...props }, ref) => {
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (value) {
        event.target.value = value.trim();
        props.onChange?.(event);
      }

      props.onBlur?.(event);
    };

    return (
      <input
        type={type}
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        onBlur={trimValueOnBlur ? handleBlur : props.onBlur}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
