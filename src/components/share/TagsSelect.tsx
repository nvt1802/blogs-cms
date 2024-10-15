import { IOption } from "@/types";
import { Badge, Dropdown } from "flowbite-react";
import { useState } from "react";
import { HiOutlineX } from "react-icons/hi";

interface IProps {
  label: string;
  options: IOption[];
  onChange?: (selectedCategories: IOption[]) => void;
}

const TagsSelect: React.FC<IProps> = ({ label, options, onChange }) => {
  const [selectedTags, setSelectedTags] = useState<IOption[]>([]);

  const handleSelectTags = (option: IOption) => {
    if (!selectedTags.includes(option)) {
      const newSelectedTags = [...selectedTags, option];
      setSelectedTags(newSelectedTags);
      if (onChange) {
        onChange(newSelectedTags);
      }
    }
  };

  const handleRemoveTags = (optionToRemove: IOption) => {
    const newSelected = selectedTags.filter(
      (category) => category.value !== optionToRemove.value
    );
    setSelectedTags(newSelected);
    if (onChange) {
      onChange(newSelected);
    }
  };

  return (
    <div className="space-y-2">
      <div className="border w-fit p-2.5 rounded-lg dark:text-white">
        <Dropdown label={label} inline={true}>
          {options.map((option) => (
            <Dropdown.Item
              key={option?.value}
              onClick={() => handleSelectTags(option)}
            >
              {option?.label}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
      {selectedTags && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((option, index) => (
            <Badge
              key={index}
              color="green"
              size="sm"
              icon={() => (
                <div className="flex flex-row gap-2 px-2">
                  <p className="my-auto">{option?.label}</p>
                  <HiOutlineX
                    size={16}
                    color="red"
                    className="cursor-pointer my-auto"
                    onClick={() => handleRemoveTags(option)}
                  />
                </div>
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsSelect;
