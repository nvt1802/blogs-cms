"use client";

import { IOption } from "@/types";
import { Checkbox, Label } from "flowbite-react";
import { useEffect, useState } from "react";

interface IProps {
  name: string;
  selected?: string[];
  options: IOption[];
  onChange?: (options: string[]) => void;
}

const TagsCheckbox: React.FC<IProps> = ({
  name,
  options,
  selected,
  onChange,
}) => {
  const [optionSeleted, setOptionSeleted] = useState<string[]>([]);

  useEffect(() => {
    setOptionSeleted(selected ?? []);
  }, [selected]);

  const handleSelectedItem = (option: string) => {
    if (!optionSeleted.includes(option)) {
      const newSelected = [...optionSeleted, option];
      setOptionSeleted(newSelected);
      if (onChange) {
        onChange(optionSeleted);
      }
    } else {
      const newSelected = optionSeleted.filter((item) => item !== option);
      setOptionSeleted(newSelected);
      if (onChange) {
        onChange(optionSeleted);
      }
    }
  };

  return (
    <fieldset className="flex max-w-md flex-col gap-4">
      {options?.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <Checkbox
            id={name}
            checked={
              item?.value ? optionSeleted?.includes(String(item?.value)) : false
            }
            onClick={() => handleSelectedItem(String(item?.value))}
          />
          <Label htmlFor={name}>{item?.label}</Label>
        </div>
      ))}
    </fieldset>
  );
};

export default TagsCheckbox;
