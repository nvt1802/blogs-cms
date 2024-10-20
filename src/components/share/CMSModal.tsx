"use client";

import { Button, Modal } from "flowbite-react";
import { useEffect } from "react";

interface IProps {
  children?: React.ReactNode;
  bottomAction?: React.ReactNode;
  isShow?: boolean;
  title?: string;
  labelOK?: string;
  labelCancel?: string;
  isFooterEmpty?: boolean;
  onClose?: () => void;
  onClickOK?: () => void;
  onClickCancel?: () => void;
}

const CMSModal: React.FC<IProps> = ({
  isShow = false,
  children,
  bottomAction,
  title,
  labelCancel,
  labelOK,
  isFooterEmpty = false,
  onClose,
  onClickOK,
  onClickCancel,
}) => {
  const onPressEscape = (event: KeyboardEvent) => {
    if (onClose && event.key === "Escape") {
      onClose();
    }
    window.removeEventListener("keyup", onPressEscape);
  };

  useEffect(() => {
    if (isShow) {
      window.addEventListener("keyup", onPressEscape);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShow]);

  return (
    <>
      <Modal show={isShow} onClose={onClose}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        {!isFooterEmpty && (
          <Modal.Footer>
            {bottomAction ? (
              bottomAction
            ) : (
              <>
                <Button onClick={onClickOK}>{labelOK}</Button>
                <Button color="gray" onClick={onClickCancel}>
                  {labelCancel}
                </Button>
              </>
            )}
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default CMSModal;
