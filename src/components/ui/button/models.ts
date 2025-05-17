import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'large';
  href?: string;
  hasArrow?: boolean;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
}
