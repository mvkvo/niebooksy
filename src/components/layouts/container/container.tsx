import './container.scss';

import classNames from 'classnames';
import { forwardRef } from 'react';
import { ContainerProps } from './models';

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={classNames('container', className)} {...rest}>
      {children}
    </div>
  )
);

Container.displayName = 'Container';
