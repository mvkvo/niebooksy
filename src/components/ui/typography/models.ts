import { HTMLAttributes } from 'react';

export type TagType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div';

export type VariantType = 'body' | 'headline';

export type WeightType = 'bold' | 'light' | 'regular';

export interface TypographyProps
  extends HTMLAttributes<
    HTMLDivElement | HTMLParagraphElement | HTMLHeadingElement
  > {
  tag: TagType;
  variant?: VariantType;
  weight?: WeightType;
  className?: string;
}
