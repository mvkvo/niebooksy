'use client';

import './input.scss';
import { forwardRef } from 'react';
import { InputProps } from './models';
import classNames from 'classnames';

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      variant = 'primary',
      inputType = 'text',
      id,
      label,
      name,
      placeholder,
      errorMessage,
      autocomplete,
      isDisabled,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        className={classNames('input-field', `input-field--${variant}`, {
          'input-field--error': errorMessage?.length,
          'input-field--disabled': isDisabled,
        })}
      >
        {label && <label htmlFor={id}>{label}</label>}
        <div className="input-field__container">
          {inputType === 'textarea' ? (
            <textarea
              id={id}
              name={name}
              placeholder={placeholder}
              ref={ref as React.Ref<HTMLTextAreaElement>}
              disabled={isDisabled}
              {...rest}
            />
          ) : (
            <input
              id={id}
              type={inputType}
              name={name}
              placeholder={placeholder}
              ref={ref as React.Ref<HTMLInputElement>}
              autoComplete={autocomplete}
              disabled={isDisabled}
              {...rest}
            />
          )}
        </div>
        {errorMessage && (
          <div className="input-field__errors">
            <ul>
              {errorMessage.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
