"use client";

import { IOption } from "@/types";
import { Label, Radio } from "flowbite-react";

interface IProps {
  name: string;
  selected?: string;
  options: IOption[];
  onChange?: (options: string) => void;
}

const CategoriesRadio: React.FC<IProps> = ({
  name,
  options,
  selected,
  onChange,
}) => {
  return (
    <fieldset className="flex max-w-md flex-col gap-4">
      {options?.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <Radio
            id={name}
            name={name}
            value="USA"
            checked={item.value === selected}
            onClick={() =>
              onChange ? onChange(String(item?.value)) : undefined
            }
          />
          <Label htmlFor={name}>{item?.label}</Label>
        </div>
      ))}
    </fieldset>
  );
};

export default CategoriesRadio;
