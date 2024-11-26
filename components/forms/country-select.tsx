"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

const countries = [
  {
    value: "AT",
    label: "Austria",
  },
  {
    value: "DE",
    label: "Germany",
  },
  {
    value: "CH",
    label: "Switzerland",
  },
];

type CountrySelectProps = {
  ref?: React.Ref<HTMLDivElement>;
  value: string;
  onChange: (country: string) => void;
};

export function CountrySelect({ ref, value, onChange }: CountrySelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex w-full justify-between px-3 font-normal",
            !value && "text-muted-foreground",
          )}
        >
          {value
            ? countries.find((country) => country.value === value)?.label
            : "Select country"}
          <ChevronUpDownIcon className="-mr-2 h-4 w-4 shrink-0 text-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command
          ref={ref}
          filter={(value, search, keywords = []) => {
            const extendValue = `${value} ${keywords.join(" ")}`.toLowerCase();

            if (extendValue.includes(search.toLowerCase())) {
              return 1;
            }

            return 0;
          }}
        >
          <CommandInput
            placeholder="Search country…"
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.value}
                  keywords={[country.label]}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      value === country.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {country.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
