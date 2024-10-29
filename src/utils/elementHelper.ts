export const addClass = (element: HTMLElement, className: string) => {
  element?.classList?.add(...className.split(" "));
};

export const removeClass = (element: HTMLElement, className: string) => {
  element.classList.remove(...className.split(" "));
};
