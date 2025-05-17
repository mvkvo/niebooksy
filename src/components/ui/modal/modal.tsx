'use client';

import './modal.scss';
import { ModalProps } from './models';
import { Button } from '@/components/ui/button';
import { FaX } from 'react-icons/fa6';

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <Button className="modal-close" onClick={onClose}>
          <FaX />
        </Button>
        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};
