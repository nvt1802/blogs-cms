"use client";

import { IOption } from "@/types";
import { Checkbox, Label } from "flowbite-react";

interface IProps {
  name: string;
  options: IOption[];
  value?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...event: any[]) => void;
}

const TagsCheckbox: React.FC<IProps> = ({ name, options, value, onChange }) => {
  return (
    <fieldset className="flex max-w-md flex-col gap-4">
      {options?.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <Checkbox
            id={String(item.value)}
            key={item.value}
            value={item.value}
            name={name}
            checked={value?.includes(String(item.value))}
            onChange={(e) => {
              const isChecked = e.target.checked;
              const newValue = isChecked
                ? [...(value || []), item.value]
                : value?.filter((id) => id !== item.value);
              onChange(newValue);
            }}
          />
          <Label htmlFor={String(item.value)}>{item?.label}</Label>
        </div>
      ))}
    </fieldset>
  );
};

export default TagsCheckbox;
