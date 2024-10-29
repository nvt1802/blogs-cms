"use client";

import CMSModal from "@/components/share/CMSModal";
import { IImage } from "@/types/images";
import { fetchImages } from "@/utils/api/images";
import { cloudinaryUrl } from "@/utils/contants";
import { useQuery } from "@tanstack/react-query";
import { Button, Spinner } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface IProps {
  onApplyImage: (image?: IImage) => void;
}

const ImageGallery: React.FC<IProps> = ({ onApplyImage }) => {
  const [isShowModal, setShowModal] = useState<boolean>(false);
  const [images, setImages] = useState<IImage[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageSelected, setImageSelected] = useState<IImage>();

  const { data, isLoading } = useQuery({
    queryKey: ["images", currentPage],
    queryFn: async () => fetchImages(currentPage, 5),
  });

  useEffect(() => {
    if (!!data?.items.length) {
      setImages([...images, ...data?.items]);
      setTotalPages(data.totalPages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-sm dark:text-white italic underline"
      >
        Open Gallery
      </button>
      <CMSModal
        isShow={isShowModal}
        onClose={() => setShowModal(false)}
        labelOK="Apply"
        labelCancel="Cancel"
        onClickOK={() => {
          onApplyImage(imageSelected);
          setShowModal(false);
        }}
        onClickCancel={() => setShowModal(false)}
      >
        {isLoading ? (
          <div className="flex flex-col text-center h-full">
            <div className="my-auto">
              <Spinner aria-label="spinner" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex flex-row flex-wrap gap-5">
              {images?.map((image, index) => (
                <Image
                  key={index}
                  alt={image.name}
                  src={`${cloudinaryUrl}/c_fill,h_100,w_100/${image.public_id}`}
                  width={100}
                  height={100}
                  className={twMerge(
                    "p-1 hover:transition-transform hover:duration-200 hover:ease-linear hover:scale-105 hover:p-0",
                    imageSelected?.id === image.id
                      ? "ring-2 ring-green-800"
                      : ""
                  )}
                  onClick={() => setImageSelected(image)}
                />
              ))}
            </div>
            <Button
              className="w-fit mx-auto"
              size="xs"
              disabled={totalPages <= currentPage}
              onClick={onLoadMore}
            >
              Load More
            </Button>
          </div>
        )}
      </CMSModal>
    </>
  );
};

export default ImageGallery;
