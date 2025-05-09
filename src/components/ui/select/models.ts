import { HTMLAttributes } from 'react';

export interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  id: string;
  variant?: 'primary' | 'secondary';
  name?: string;
  className?: string;
  isHidden?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  options: OptionProps[];
}

export interface OptionProps {
  id: number;
  name: string;
}
