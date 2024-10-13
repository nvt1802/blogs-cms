import { twMerge } from "tailwind-merge";

interface IProps {
  children?: React.ReactNode;
  active?: boolean;
}

const TabItem: React.FC<IProps> = ({ children, active }) => {
  return (
    <div
      className={twMerge(
        "hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800",
        active ? "block" : ""
      )}
      id="styled-profile"
      role="tabpanel"
      aria-labelledby="profile-tab"
    >
      {children}
    </div>
  );
};

export default TabItem;
