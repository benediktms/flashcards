import type {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';

import { cn } from '@/utils/cn';

type Props = PropsWithChildren &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Container = ({ children, className, ...props }: Props) => {
  return (
    <div {...props} className={cn('md:mx-15 sm:mx-10 lg:mx-60', className)}>
      {children}
    </div>
  );
};
