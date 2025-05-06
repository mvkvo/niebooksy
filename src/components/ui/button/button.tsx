"use client";

import { forwardRef, useEffect } from "react";
import { ButtonProps } from "./models";
import classNames from "classnames";
import { FaLongArrowAltRight } from "react-icons/fa";

import "./button.scss";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "large",
      hasArrow = true,
      className = "",
      children,
      onClick,
      disabled = false,
      type = "button",
      ...rest
    },
    ref
  ) => {
    useEffect(() => {}, []);

    return (
      <>
        <button
          className={classNames(
            "btn",
            `btn--${variant}`,
            `btn--${size}`,
            className
          )}
          onClick={onClick}
          disabled={disabled}
          type={type}
          ref={ref}
          {...rest}
        >
          {children}
          {hasArrow && <FaLongArrowAltRight />}
        </button>
      </>
    );
  }
);

Button.displayName = "Button";
