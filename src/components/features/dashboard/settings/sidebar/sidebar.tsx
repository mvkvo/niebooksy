'use client';

import './sidebar.scss';

import { Typography } from '@/components/ui/typography';
import classNames from 'classnames';
import { SidebarProps } from './models';

export const Sidebar = ({ elements, active, onSelect }: SidebarProps) => {
  return (
    <div className="sidebar">
      <ul>
        {elements.map((el) => (
          <li
            key={el.id}
            onClick={() => onSelect(el.id)}
            className={classNames('sidebar__item', {
              'sidebar__item--active': active === el.id,
            })}
          >
            <Typography tag="h3">{el.title}</Typography>
          </li>
        ))}
        <li className="sidebar__item" />
      </ul>
    </div>
  );
};
