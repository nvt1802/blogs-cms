import { IPost, IPostPaginationResponse } from "@/types/posts";
import { cloudinaryUrl } from "@/utils/contants";
import dayjs from "dayjs";
import { Badge, Card, Pagination, Tooltip } from "flowbite-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

interface IProps {
  currentPage: number;
  posts?: IPostPaginationResponse;
  onChange?: (page: number) => void;
  onEditItem?: (post: IPost) => void;
  onRemoveItem?: (post: IPost) => void;
}

const PostListing: React.FC<IProps> = ({
  currentPage = 1,
  posts,
  onChange,
  onEditItem,
  onRemoveItem,
}) => {
  const t = useTranslations("PostsPage");

  const onPageChange = (page: number) => {
    if (onChange) {
      onChange(page);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        {posts?.items?.map((item) => (
          <Card key={item?.id} className="custom-card">
            <div className="flex flex-row gap-2 xs:gap-4 w-full justify-between">
              <div className="relative min-w-[100px] max-w-[100px] xs:min-w-[140px] min-h-[90px] xs:max-w-[140px] max-h-[90px]">
                <Image
                  src={`${cloudinaryUrl}/c_fill,h_90,w_140/${
                    item.featured_image ?? ""
                  }`}
                  alt={item?.title}
                  width={140}
                  height={90}
                  className="w-full h-full"
                />
                <Badge className="w-fit absolute top-1 left-1 px-1 py-0.5 text-[10px] leading-[10px]">
                  {item?.categories?.name}
                </Badge>
              </div>
              <div className="flex flex-col gap-1.5 dark:text-white w-full max-w-[calc(100%-160px)] xs:max-w-[calc(100%-200px)]">
                <p className="text-sm truncate w-full">{item?.title}</p>
                <p className="inline-flex gap-2 text-xs">
                  <span>{t("column-status")}:</span>
                  <Badge className="w-fit my-auto px-1 py-0.5 text-[10px] leading-[10px]">
                    {item?.status}
                  </Badge>
                </p>
                <p className="inline-flex gap-2 text-xs">
                  <span>{t("column-created-by")}:</span>
                  <span>{item?.users?.username}</span>
                </p>
                <p className="inline-flex gap-2 text-xs">
                  <span>{t("published-at")}:</span>
                  <span>
                    {dayjs(item?.published_at).format("DD/MM/YYYY HH:mm")}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-2 my-auto">
                <Tooltip content={`Edit ${item?.title}`} placement="left-start">
                  <button
                    onClick={() => (onEditItem ? onEditItem(item) : undefined)}
                  >
                    <HiOutlinePencil className="dark:fill-white" size={20} />
                  </button>
                </Tooltip>
                <Tooltip
                  content={`Remove ${item?.title}`}
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
        {posts?.totalPages && posts?.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={posts?.totalPages || 0}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default PostListing;
