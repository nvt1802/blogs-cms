import { useState } from "react";
import { Dropdown } from "flowbite-react";
import { IOption } from "@/types";

interface SelectDropdownProps {
  options: IOption[];
  onSelect?: (selectedOption: IOption) => void;
  placeholder?: string;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  onSelect,
  placeholder = "Select an option",
}) => {
  const [selectedOption, setSelectedOption] = useState<IOption | null>(null);

  const handleSelectOption = (option: IOption) => {
    setSelectedOption(option);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div className="border w-fit p-2.5 rounded-lg dark:text-white">
      <Dropdown
        label={selectedOption?.label || placeholder}
        inline={true}
        color="info"
      >
        {options.map((option) => (
          <Dropdown.Item
            key={option?.label}
            onClick={() => handleSelectOption(option)}
          >
            {option?.label}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
};

export default SelectDropdown;
