"use client";

import { forwardRef } from "react";
import { InputProps } from "./models";

import "./input.scss";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, inputType, name, ...rest }, ref) => {
    return (
      <div className="input-field">
        <label htmlFor={id}>{label}</label>
        <div className="input-field__container">
          <input id={id} type={inputType} name={name} ref={ref} {...rest} />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
