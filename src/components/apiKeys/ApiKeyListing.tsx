import { IApiKeys, IApiKeysPaginationResponse } from "@/types/api-keys";
import { Card, Clipboard, Pagination, Tooltip } from "flowbite-react";
import { useTranslations } from "next-intl";
import { HiOutlineBookmark, HiOutlineTrash } from "react-icons/hi";

interface IProps {
  currentPage: number;
  data?: IApiKeysPaginationResponse;
  onChange?: (page: number) => void;
  onRemoveItem?: (apiKey: IApiKeys) => void;
}

const ApiKeyListing: React.FC<IProps> = ({
  currentPage = 1,
  data,
  onChange,
  onRemoveItem,
}) => {
  const t = useTranslations("ApiKeysPage");

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
                <div className="relative flex flex-row gap-2 text-sm">
                  <div>
                    {item.token.slice(0, 8)}
                    {"*****"}
                  </div>
                  <div className="ml-8 relative">
                    <Clipboard.WithIcon
                      valueToCopy={item.token}
                      key={item.token}
                    />
                  </div>
                </div>
                <p className="inline-flex gap-2 text-sm">
                  <span>{t("column-duration")}:</span>
                  <span>{t(item.duration)}</span>
                </p>
              </div>
              <div className="my-auto">
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

export default ApiKeyListing;
