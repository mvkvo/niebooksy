"use client";

import { ModalProps } from "./models";
import "./modal.scss";
import { Button } from "@/components/ui/button";

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <Button className="modal-close" onClick={onClose}>
          x
        </Button>
        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};
