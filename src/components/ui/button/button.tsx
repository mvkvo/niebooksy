'use client';

import { forwardRef } from 'react';
import { ButtonProps } from './models';
import classNames from 'classnames';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Link from 'next/link';

import './button.scss';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'large',
      hasArrow = false,
      href,
      className = '',
      children,
      onClick,
      disabled = false,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    const classes = classNames(
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      className
    );

    if (href)
      return (
        <Link href={href} className={classes}>
          {children}
          {hasArrow && <FaLongArrowAltRight />}
        </Link>
      );

    return (
      <button
        className={classes}
        onClick={onClick}
        disabled={disabled}
        type={type}
        ref={ref}
        {...rest}
      >
        {children}
        {hasArrow && <FaLongArrowAltRight />}
      </button>
    );
  }
);

Button.displayName = 'Button';
