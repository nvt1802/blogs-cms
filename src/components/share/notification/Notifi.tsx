"use client";

import { Toast } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiInformationCircle,
  HiX,
} from "react-icons/hi";

interface NotifiProps {
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
  onClose?: () => void;
}

const Notifi: React.FC<NotifiProps> = ({
  message,
  type,
  duration,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <HiCheckCircle className="text-green-500" />;
      case "error":
        return <HiExclamationCircle className="text-red-500" />;
      case "info":
      default:
        return <HiInformationCircle className="text-blue-500" />;
    }
  };

  if (!visible) return null;

  return (
    <Toast>
      <div className="flex items-center gap-4">
        {getIcon()}
        <div className="text-sm font-medium">{message}</div>
        <button onClick={handleClose} aria-label="Close notification">
          <HiX className="text-gray-500 hover:text-gray-800" />
        </button>
      </div>
    </Toast>
  );
};

export default Notifi;
