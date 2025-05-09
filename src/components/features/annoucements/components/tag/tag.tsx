'use client';

import './tag.scss';
import { TagProps } from '../../models';

export const Tag = ({ name }: TagProps) => {
  return <div className="announcement__tag">{name}</div>;
};
