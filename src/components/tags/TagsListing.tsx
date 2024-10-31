import { ITags, ITagsPaginationResponse } from "@/types/tags";
import dayjs from "dayjs";
import { Card, Pagination, Tooltip } from "flowbite-react";
import { useTranslations } from "next-intl";
import {
  HiOutlineBookmark,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";

interface IProps {
  currentPage: number;
  data?: ITagsPaginationResponse;
  onChange?: (page: number) => void;
  onEditItem?: (post: ITags) => void;
  onRemoveItem?: (post: ITags) => void;
}

const TagsListing: React.FC<IProps> = ({
  currentPage = 1,
  data,
  onChange,
  onEditItem,
  onRemoveItem,
}) => {
  const t = useTranslations("TagsPage");

  const onPageChange = (page: number) => {
    if (onChange) {
      onChange(page);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        {data?.items?.map((item) => (
          <Card key={item?.id} className="custom-card w-full">
            <div className="flex flex-row gap-2 xs:gap-4 w-full justify-between">
              <HiOutlineBookmark size={40} className="my-auto" />
              <div className="flex flex-col gap-1.5 dark:text-white w-full">
                <p className="text-base truncate font-semibold w-full">
                  {item?.name}
                </p>
                <p className="inline-flex gap-2 text-sm">
                  <span>{t("column-created-at")}:</span>
                  <span>
                    {dayjs(item?.created_at).format("DD/MM/YYYY HH:mm")}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-2 my-auto">
                <Tooltip content={`Edit ${item?.name}`} placement="left-start">
                  <button
                    onClick={() => (onEditItem ? onEditItem(item) : undefined)}
                  >
                    <HiOutlinePencil className="dark:fill-white" size={20} />
                  </button>
                </Tooltip>
                <Tooltip
                  content={`Remove ${item?.name}`}
                  placement="left-start"
                >
                  <button
                    onClick={() =>
                      onRemoveItem ? onRemoveItem(item) : undefined
                    }
                  >
                    <HiOutlineTrash className="dark:fill-white" size={20} />
                  </button>
                </Tooltip>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex overflow-x-auto sm:justify-center">
        {data?.totalPages && data?.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={data?.totalPages || 0}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default TagsListing;
