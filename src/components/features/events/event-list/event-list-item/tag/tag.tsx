'use client';

import './tag.scss';
import { TagProps } from '../../models';

export const Tag = ({ name }: TagProps) => {
  return <div className="event__tag">{name}</div>;
};
