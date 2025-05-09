'use client';

import { forwardRef } from 'react';
import { InputProps } from './models';

import './input.scss';
import classNames from 'classnames';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { variant = 'primary', id, label, inputType, name, placeholder, ...rest },
    ref
  ) => {
    return (
      <div className={classNames('input-field', `input-field--${variant}`)}>
        {label && <label htmlFor={id}>{label}</label>}
        <div className="input-field__container">
          <input
            id={id}
            type={inputType}
            name={name}
            placeholder={placeholder}
            ref={ref}
            {...rest}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';
