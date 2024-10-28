import { IImagesPaginationResponse } from "@/types/images";
import { cloudinaryUrl } from "./contants";

type ImageToolData = {
  url?: string;
  caption?: string;
};

type ImageSelectionPluginConfig = {
  fetchImages: (page: number) => Promise<IImagesPaginationResponse>;
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
  private fetchImages?: (page: number) => Promise<IImagesPaginationResponse>;
  private images: IImages[];
  private imageSelected?: IImages;
  private caption: string;

  constructor({
    data,
    config,
  }: {
    data?: ImageToolData;
    config?: ImageSelectionPluginConfig;
  }) {
    this.data = data || { url: "", caption: "" };
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("image-selection-wrapper", "relative");
    this.modal = null;
    this.images = [];
    this.imageSelected = undefined;
    this.caption = "";
    this.fetchImages = config?.fetchImages;
  }

  render(): HTMLElement {
    if (this.data.url) {
      this.renderImage(this.data.url);
    } else {
      const openGalleryButton = document.createElement("button");
      openGalleryButton.textContent = "Open Gallery";
      openGalleryButton.type = "button";
      openGalleryButton.classList.add("open-gallery-button");
      openGalleryButton.onclick = () => this.openModal();
      this.wrapper.appendChild(openGalleryButton);
    }
    return this.wrapper;
  }

  private renderImage(url: string): void {
    // Clear any existing image
    const existingImage = this.wrapper.querySelector("img");
    if (existingImage) existingImage.remove();

    const actionHover = document.createElement("div");
    const btnChangeImage = document.createElement("button");
    const btnDeleteImage = document.createElement("button");
    actionHover.classList.add("absolute", "top-10", "left-1/2", "flex", "flex-row", "gap-3");

    btnChangeImage.type = "button";
    btnChangeImage.innerHTML = `<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>`;
    btnChangeImage.onclick = () => this.openModal();

    btnDeleteImage.type = "button";
    btnDeleteImage.innerHTML = `<svg width="17" height="17" viewBox="0 -0.5 21 21" xmlns="http://www.w3.org/2000/svg"><path d="M7.35 16h2.1V8h-2.1zm4.2 0h2.1V8h-2.1zm-6.3 2h10.5V6H5.25zm2.1-14h6.3V2h-6.3zm8.4 0V0H5.25v4H0v2h3.15v14h14.7V6H21V4z" fill-rule="evenodd"/></svg>`;
    btnDeleteImage.onclick = () => {
      this.data.url = this.imageSelected?.url;
      this.data.caption = this.caption;
    };

    actionHover.appendChild(btnChangeImage);
    actionHover.appendChild(btnDeleteImage);
    const img = document.createElement("img");
    img.src = url;
    img.classList.add("image-preview");
    this.wrapper.appendChild(img);
    this.wrapper.appendChild(actionHover);
  }

  private onMountModal(): void {
    this.modal = document.createElement("div");
    this.modal.classList.add("image-modal");

    const modalContent = document.createElement("div");
    const imageSection = document.createElement("div");
    modalContent.classList.add("modal-content", "flex", "flex-col", "gap-5");
    imageSection.classList.add("image-section", "flex", "flex-row", "gap-4");

    const onClickImage = (image: IImages) => {
      this.imageSelected = image;
      // (event.target as HTMLImageElement).setAttribute("data-name", image.alt);
      this.modal?.querySelectorAll(".modal-image-option")?.forEach((imgTag) => {
        if (imgTag?.getAttribute("data-name") === image.alt) {
          imgTag.classList.add("ring-2", "ring-green-800");
        } else {
          imgTag.classList.remove("ring-2", "ring-green-800");
        }
      });
    };

    this.images.forEach((image) => {
      const img = document.createElement("img");
      img.src = image?.urlPreview ?? "";
      img.alt = image.alt;
      img.setAttribute("data-name", image.alt);
      img.classList.add("modal-image-option");
      img.onclick = () => onClickImage(image);
      imageSection.appendChild(img);
    });
    const actionDiv = document.createElement("div");
    const closeButton = document.createElement("button");
    const applyButton = document.createElement("button");
    actionDiv.classList.add(
      "flex",
      "flex-row",
      "gap-4",
      "w-full",
      "justify-end"
    );
    closeButton.textContent = "Close";
    closeButton.classList.add("close-modal-button");
    applyButton.textContent = "Apply";
    applyButton.classList.add("apply-modal-button");
    actionDiv.appendChild(applyButton);
    actionDiv.appendChild(closeButton);

    closeButton.onclick = () => this.closeModal();
    applyButton.onclick = () => this.selectImage();
    modalContent.appendChild(imageSection);
    modalContent.appendChild(actionDiv);
    this.modal.appendChild(modalContent);
    document.body.appendChild(this.modal);
  }

  private openModal(): void {
    if (this.fetchImages) {
      this.fetchImages(1).then((res) => {
        this.images = res.items.map((item) => ({
          url: `${cloudinaryUrl}/${item.public_id}`,
          alt: item?.name,
          urlPreview: `${cloudinaryUrl}/c_fill,h_100,w_100/${item.public_id}`,
        }));
        this.onMountModal();
      });
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
