'use client';

import './typography.scss';
import { forwardRef } from 'react';
import { TypographyProps } from './models';
import classNames from 'classnames';

export const Typography = forwardRef<
  HTMLDivElement | HTMLParagraphElement | HTMLHeadingElement,
  TypographyProps
>(
  (
    {
      tag = 'div',
      variant = 'body',
      weight = 'regular',
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const Tag = tag;

    return (
      <Tag
        className={classNames(
          'typography',
          `typography--${variant}`,
          `typography--${weight}`,
          className
        )}
        ref={ref}
        {...rest}
      >
        {children}
      </Tag>
    );
  }
);

Typography.displayName = 'Typography';
