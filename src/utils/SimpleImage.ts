import { IImagesPaginationResponse } from "@/types/images";
import { cloudinaryUrl } from "@/utils/contants";
import { addClass, removeClass } from "@/utils/elementHelper";

type ImageToolData = {
  url?: string;
  caption?: string;
};

type ImageSelectionPluginConfig = {
  fetchImages: (
    page: number,
    limit?: number
  ) => Promise<IImagesPaginationResponse>;
};

interface IImages {
  url: string;
  alt: string;
  urlPreview?: string;
}

class SimpleImage {
  static get toolbox() {
    return {
      title: "Image",
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
    };
  }

  private data: ImageToolData;
  private wrapper: HTMLElement;
  private modal: HTMLElement | null;
  private fetchImages?: (
    page: number,
    limit?: number
  ) => Promise<IImagesPaginationResponse>;
  private images: IImages[];
  private imageSelected?: IImages;
  private caption: string;
  private currentPage: number;
  private totalPages: number;

  constructor({
    data,
    config,
  }: {
    data?: ImageToolData;
    config?: ImageSelectionPluginConfig;
  }) {
    this.data = data || { url: "", caption: "" };
    this.wrapper = document.createElement("div");
    addClass(this.wrapper, "image-selection-wrapper relative");
    this.modal = null;
    this.images = [];
    this.imageSelected = undefined;
    this.caption = "";
    this.currentPage = 1;
    this.totalPages = 1;
    this.fetchImages = config?.fetchImages;
  }

  render(): HTMLElement {
    if (this.data.url) {
      this.renderImage(this.data.url);
    } else {
      this.renderButtonOpenModal();
    }
    return this.wrapper;
  }

  private renderButtonOpenModal = () => {
    const openGalleryButton = document.createElement("button");
    openGalleryButton.textContent = "Open Gallery";
    openGalleryButton.type = "button";
    addClass(openGalleryButton, "open-gallery-button");
    openGalleryButton.onclick = () => this.openModal();
    this.wrapper.appendChild(openGalleryButton);
  };

  private renderImage(url: string): void {
    // Clear any existing image
    const existingImage = this.wrapper.querySelector("img");
    if (existingImage) existingImage.remove();

    const actionHover = document.createElement("div");
    const btnChangeImage = document.createElement("button");
    const btnDeleteImage = document.createElement("button");
    addClass(actionHover, "action-hover");

    btnChangeImage.type = "button";
    addClass(btnChangeImage, "btn");
    btnChangeImage.innerHTML = `<svg width="17" height="15" viewBox="0 0 336 276" style="fill: white;" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>`;
    btnChangeImage.onclick = () => this.openModal();

    btnDeleteImage.type = "button";
    addClass(btnDeleteImage, "btn");
    btnDeleteImage.innerHTML = `<svg width="17" height="17" viewBox="0 -0.5 21 21" style="fill: white;" xmlns="http://www.w3.org/2000/svg"><path d="M7.35 16h2.1V8h-2.1zm4.2 0h2.1V8h-2.1zm-6.3 2h10.5V6H5.25zm2.1-14h6.3V2h-6.3zm8.4 0V0H5.25v4H0v2h3.15v14h14.7V6H21V4z" fill-rule="evenodd"/></svg>`;
    btnDeleteImage.onclick = () => {
      this.data.url = "";
      this.data.caption = this.caption;
      this.wrapper.querySelector("img")?.remove();
      this.renderButtonOpenModal();
    };

    actionHover.appendChild(btnChangeImage);
    actionHover.appendChild(btnDeleteImage);
    const img = document.createElement("img");
    img.src = url;
    addClass(img, "image-preview");
    this.wrapper.appendChild(img);
    this.wrapper.appendChild(actionHover);
  }

  private onMountModal(): void {
    this.modal = document.createElement("div");
    addClass(this.modal, "image-modal");

    const modalContent = document.createElement("div");
    const buttonLoadmore = document.createElement("button");
    const imageSection = document.createElement("div");
    buttonLoadmore.innerText = "Load More";
    buttonLoadmore.onclick = () => {
      if (this.fetchImages) {
        this.currentPage += 1;
        this.fetchImages(this.currentPage, 7).then((res) => {
          this.totalPages = res.totalPages;
          if (res.totalPages <= this.currentPage) {
            buttonLoadmore.remove();
          }
          const newListImage = res.items.map((item) => ({
            url: `${cloudinaryUrl}/${item.public_id}`,
            alt: item?.name,
            urlPreview: `${cloudinaryUrl}/c_fill,h_100,w_100/${item.public_id}`,
          }));
          newListImage.forEach((image) => {
            const img = document.createElement("img");
            img.src = image?.urlPreview ?? "";
            img.alt = image.alt;
            img.setAttribute("data-name", image.alt);
            addClass(img, "modal-image-option");
            img.onclick = () => onClickImage(image);
            imageSection.appendChild(img);
          });
          this.images = [...this.images, ...newListImage];
        });
      }
    };
    addClass(modalContent, "modal-content");
    addClass(buttonLoadmore, "btn-load-more");
    addClass(imageSection, "image-section");

    const onClickImage = (image: IImages) => {
      this.imageSelected = image;
      this.modal?.querySelectorAll(".modal-image-option")?.forEach((imgTag) => {
        if (imgTag?.getAttribute("data-name") === image.alt) {
          addClass(imgTag as HTMLElement, "ring-2 ring-green-800");
        } else {
          removeClass(imgTag as HTMLElement, "ring-2 ring-green-800");
        }
      });
    };

    this.images.forEach((image) => {
      const img = document.createElement("img");
      img.src = image?.urlPreview ?? "";
      img.alt = image.alt;
      img.setAttribute("data-name", image.alt);
      addClass(img, "modal-image-option");
      img.onclick = () => onClickImage(image);
      imageSection.appendChild(img);
    });
    const actionDiv = document.createElement("div");
    const closeButton = document.createElement("button");
    const applyButton = document.createElement("button");
    addClass(actionDiv, "footer-btn");
    closeButton.textContent = "Close";
    addClass(closeButton, "close-modal-button");
    applyButton.textContent = "Apply";
    addClass(applyButton, "apply-modal-button");
    actionDiv.appendChild(applyButton);
    actionDiv.appendChild(closeButton);

    closeButton.onclick = () => this.closeModal();
    applyButton.onclick = () => this.selectImage();
    modalContent.appendChild(imageSection);
    if (this.totalPages > this.currentPage) {
      modalContent.appendChild(buttonLoadmore);
    }
    modalContent.appendChild(actionDiv);
    this.modal.appendChild(modalContent);
    document.body.appendChild(this.modal);
  }

  private openModal(): void {
    if (this.fetchImages && !this.images.length) {
      this.fetchImages(this.currentPage, 7).then((res) => {
        this.images = res.items.map((item) => ({
          url: `${cloudinaryUrl}/${item.public_id}`,
          alt: item?.name,
          urlPreview: `${cloudinaryUrl}/c_fill,h_100,w_100/${item.public_id}`,
        }));
        this.totalPages = res.totalPages;
        this.onMountModal();
      });
    } else {
      this.onMountModal();
    }
  }

  private selectImage(): void {
    this.data.url = this.imageSelected?.url;
    this.data.caption = this.caption;
    if (this.imageSelected?.url) {
      this.renderImage(this.imageSelected?.url);
    }
    this.closeModal();
    document
      .querySelector(".image-selection-wrapper .open-gallery-button")
      ?.remove();
  }

  private closeModal(): void {
    if (this.modal) {
      document.body.removeChild(this.modal);
      this.modal = null;
    }
  }

  save(): ImageToolData {
    return {
      url: this.data.url,
    };
  }
}
export default SimpleImage;
