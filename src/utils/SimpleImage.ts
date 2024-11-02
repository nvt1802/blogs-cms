import { IImagesPaginationResponse } from "@/types/images";
import { cloudinaryUrl } from "@/utils/contants";
import { addClass, removeClass } from "@/utils/elementHelper";

type ImageToolData = {
  url?: string;
  caption?: string;
  width?: number;
  height?: number;
};

type ImageSelectionPluginConfig = {
  fetchImages: (
    page: number,
    limit?: number
  ) => Promise<IImagesPaginationResponse>;
};

interface IImages {
  publicId: string;
  name: string;
  alt: string;
  urlPreview?: string;
}

class SimpleImage {
  static get toolbox() {
    return {
      title: "Image",
      icon: `<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg">
                <path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/>
              </svg>`,
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
  private publicId?: string;
  private caption: string;
  private currentPage: number;
  private totalPages: number;
  private isResizing: boolean;
  private startWidth: number;
  private startHeight: number;
  private startX: number;
  private startY: number;

  constructor({
    data = { url: "", caption: "", width: 1280, height: 800 },
    config,
  }: {
    data?: ImageToolData;
    config?: ImageSelectionPluginConfig;
  }) {
    this.data = data;
    this.wrapper = this.createWrapper();
    this.modal = null;
    this.images = [];
    this.imageSelected = undefined;
    this.caption = "";
    this.currentPage = 1;
    this.totalPages = 1;
    this.fetchImages = config?.fetchImages;
    this.isResizing = false;
    this.startWidth = data.width || 1280;
    this.startHeight = data.height || 800;
    this.startX = 0;
    this.startY = 0;
    const exm = data.url?.split("/").reverse();
    if (!!exm?.length) {
      this.publicId = `${exm[1]}/${exm[0]}`;
    }
  }

  private createWrapper(): HTMLElement {
    const wrapper = document.createElement("div");
    addClass(wrapper, "image-selection-wrapper relative");
    return wrapper;
  }

  render(): HTMLElement {
    if (this.publicId) {
      this.renderImage(this.publicId);
    } else {
      this.renderOpenGalleryButton();
    }
    return this.wrapper;
  }

  private renderOpenGalleryButton(): void {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Open Gallery";
    addClass(button, "open-gallery-button");
    button.onclick = () => this.openModal();
    this.wrapper.appendChild(button);
  }

  private createCaptionInput(): HTMLElement {
    const captionInput = document.createElement("input");
    captionInput.type = "text";
    captionInput.placeholder = "Enter caption";
    captionInput.value = this.data.caption || "";
    captionInput.style.width = `${this.data.width}px`;
    addClass(captionInput, "caption-input");
    captionInput.oninput = (e) => {
      this.data.caption = (e.target as HTMLInputElement).value;
    };
    return captionInput;
  }

  private createResizeHandle(): HTMLElement {
    const handle = document.createElement("div");
    addClass(handle, "resize-handle");
    return handle;
  }

  private initResize(img: HTMLImageElement, handle: HTMLElement): void {
    handle.style.position = "absolute";
    handle.style.width = "10px";
    handle.style.height = "10px";
    handle.style.background = "gray";
    handle.style.cursor = "nwse-resize";
    handle.style.bottom = "0";
    handle.style.right = "0";

    handle.addEventListener("mousedown", (e) => {
      this.isResizing = true;
      this.startWidth = img.offsetWidth;
      this.startHeight = img.offsetHeight;
      this.startX = e.clientX;
      this.startY = e.clientY;

      document.addEventListener("mousemove", this.resize.bind(this, img));
      document.addEventListener("mouseup", this.stopResize.bind(this, img));
    });
  }

  private resize(img: HTMLImageElement, e: MouseEvent): void {
    if (this.isResizing) {
      const width = this.startWidth + (e.clientX - this.startX);
      const height = this.startHeight + (e.clientY - this.startY);
      img.style.width = `${Math.max(width, 50)}px`;
      img.style.height = `${Math.max(height, 50)}px`;
      this.data.width = Math.max(width, 50);
      this.data.height = Math.max(height, 50);
      img.src = `${cloudinaryUrl}/c_fill,h_${this.data.height},w_${this.data.width}/${this.publicId}`;
      const captionInput = this.wrapper.querySelector(
        ".caption-input"
      ) as HTMLDivElement;
      if (captionInput) {
        captionInput.style.width = `${this.data.width}px`;
      }
    }
  }

  private stopResize(img: HTMLImageElement): void {
    this.isResizing = false;
    document.removeEventListener("mousemove", this.resize.bind(this, img));
    document.removeEventListener("mouseup", this.stopResize.bind(this, img));
  }

  private renderImage(publicId: string): void {
    // Clear any existing image
    const existingImage = this.wrapper.querySelector("img");
    if (existingImage) {
      existingImage.src = `${cloudinaryUrl}/c_fill,h_${this.data.height},w_${this.data.width}/${publicId}`;
    } else {
      const imgWrapper = document.createElement("div");
      addClass(imgWrapper, "image-preview-wrapper");
      const img = document.createElement("img");
      img.src = `${cloudinaryUrl}/c_fill,h_${this.data.height ?? 340},w_${
        this.data.width ?? 600
      }/${publicId}`;
      addClass(img, "image-preview");

      img.style.width = `${this.data.width}px`;
      img.style.height = `${this.data.height}px`;

      const actionHover = this.createActionHover();
      const captionElement = this.createCaptionInput();

      imgWrapper.appendChild(img);
      this.wrapper.appendChild(imgWrapper);
      this.wrapper.appendChild(actionHover);
      this.wrapper.appendChild(captionElement);
      const resizeHandle = this.createResizeHandle();
      imgWrapper.appendChild(resizeHandle);
      this.initResize(img, resizeHandle);
    }
  }

  private createActionHover(): HTMLElement {
    const actionHover = document.createElement("div");
    addClass(actionHover, "action-hover");

    const btnChange = this.createButton(
      `<svg width="17" height="15" viewBox="0 0 336 276" style="fill: white;" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>`,
      "btn",
      this.openModal.bind(this)
    );
    const btnDelete = this.createButton(
      `<svg width="17" height="17" viewBox="0 -0.5 21 21" style="fill: white;" xmlns="http://www.w3.org/2000/svg"><path d="M7.35 16h2.1V8h-2.1zm4.2 0h2.1V8h-2.1zm-6.3 2h10.5V6H5.25zm2.1-14h6.3V2h-6.3zm8.4 0V0H5.25v4H0v2h3.15v14h14.7V6H21V4z" fill-rule="evenodd"/></svg>`,
      "btn",
      this.deleteImage.bind(this)
    );

    actionHover.appendChild(btnChange);
    actionHover.appendChild(btnDelete);
    return actionHover;
  }

  private createButton(
    text: string,
    className: string,
    onClick: () => void
  ): HTMLButtonElement {
    const button = document.createElement("button");
    button.type = "button";
    addClass(button, className);
    button.innerHTML = `${text}`;
    button.onclick = onClick;
    return button;
  }

  private deleteImage(): void {
    this.publicId = "";
    this.data.caption = this.caption;
    this.wrapper.querySelector(".image-preview-wrapper")?.remove();
    this.wrapper.querySelector(".action-hover")?.remove();
    this.wrapper.querySelector(".caption-input")?.remove();
    this.renderOpenGalleryButton();
  }

  private async openModal(): Promise<void> {
    if (this.fetchImages && !this.images.length) {
      const res = await this.fetchImages(this.currentPage, 7);
      this.images = this.formatImages(res.items);
      this.totalPages = res.totalPages;
    }
    this.mountModal();
  }

  private mountModal(): void {
    this.modal = this.createModal();

    const modalContent = document.createElement("div");
    addClass(modalContent, "modal-content");

    const imageSection = this.createImageSection();
    const buttonLoadMore = this.createLoadMoreButton(imageSection);

    modalContent.appendChild(imageSection);
    if (this.totalPages > this.currentPage)
      modalContent.appendChild(buttonLoadMore);
    modalContent.appendChild(this.createModalActions());

    this.modal.appendChild(modalContent);
    document.body.appendChild(this.modal);
  }

  private createModal(): HTMLElement {
    const modal = document.createElement("div");
    addClass(modal, "image-modal");
    return modal;
  }

  private createImageSection(): HTMLElement {
    const imageSection = document.createElement("div");
    addClass(imageSection, "image-section");

    this.images.forEach((image) => {
      const img = this.createImageThumbnail(image);
      img.onclick = () => this.selectImageInModal(image, img);
      imageSection.appendChild(img);
    });

    return imageSection;
  }

  private createImageThumbnail(image: IImages): HTMLImageElement {
    const img = document.createElement("img");
    img.src = image.urlPreview ?? "";
    img.alt = image.alt;
    img.title = image.name;
    img.setAttribute("data-name", image.alt);
    addClass(img, "modal-image-option");
    return img;
  }

  private selectImageInModal(image: IImages, img: HTMLImageElement): void {
    this.imageSelected = image;
    this.clearSelectedImage();
    addClass(img, "ring-2 ring-green-800");
  }

  private clearSelectedImage(): void {
    this.modal?.querySelectorAll(".modal-image-option").forEach((img) => {
      removeClass(img as HTMLElement, "ring-2 ring-green-800");
    });
  }

  private createLoadMoreButton(imageSection: HTMLElement): HTMLButtonElement {
    const button = document.createElement("button");
    button.innerText = "Load More";
    addClass(button, "btn-load-more");
    button.onclick = async () => {
      if (this.fetchImages) {
        this.currentPage += 1;
        const res = await this.fetchImages(this.currentPage, 7);
        const newImages = this.formatImages(res.items);
        newImages.forEach((image) => {
          const img = this.createImageThumbnail(image);
          img.onclick = () => this.selectImageInModal(image, img);
          imageSection.appendChild(img);
        });
        this.images.push(...newImages);
        if (this.currentPage >= res.totalPages) button.remove();
      }
    };
    return button;
  }

  private formatImages(
    items: { public_id: string; name: string }[]
  ): IImages[] {
    return items.map((item) => ({
      publicId: item.public_id,
      name: item?.name,
      alt: item.name,
      urlPreview: `${cloudinaryUrl}/c_fill,h_100,w_100/${item.public_id}`,
    }));
  }

  private createModalActions(): HTMLElement {
    const actionDiv = document.createElement("div");
    addClass(actionDiv, "footer-btn");

    const closeButton = this.createButton(
      "Close",
      "close-modal-button",
      this.closeModal.bind(this)
    );
    const applyButton = this.createButton(
      "Apply",
      "apply-modal-button",
      this.applySelectedImage.bind(this)
    );

    actionDiv.appendChild(applyButton);
    actionDiv.appendChild(closeButton);
    return actionDiv;
  }

  private applySelectedImage(): void {
    if (cloudinaryUrl) {
      this.publicId = this.imageSelected?.publicId;
    }
    this.data.caption = this.caption;
    if (this.imageSelected?.publicId) {
      this.data.width = 600;
      this.data.height = 340;
      this.renderImage(this.imageSelected?.publicId);
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
      url: `${cloudinaryUrl}/c_fill,h_${this.data.height},w_${this.data.width}/${this.publicId}`,
      caption: this.data.caption,
      width: this.data.width,
      height: this.data.height,
    };
  }
}

export default SimpleImage;
