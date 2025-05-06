import { HTMLAttributes } from "react";

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
  className?: string;
  isHidden?: boolean;
  isDisabled?: boolean;
  inputType?: "password" | "text";
  id: string;
  label: string;
  description?: string;
  tooltipText?: string;
  name: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  errorMessage?: string;
}
