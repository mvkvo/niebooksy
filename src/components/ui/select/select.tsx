'use client';

import './select.scss';

import classNames from 'classnames';
import { forwardRef } from 'react';
import { SelectProps } from './models';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ id, variant = 'primary', name, placeholder, options, ...rest }, ref) => {
    return (
      <div className={classNames('select', `select--${variant}`)}>
        <select id={id} name={name} ref={ref} defaultValue="" {...rest}>
          {placeholder && (
            <option className="select--placeholder" value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = 'Select';
