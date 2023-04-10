import React from 'react';

import { cn } from '../../utils/cn';

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({ children, ...props }: Props) => {
  return (
    <button
      {...props}
      className={cn(
        'cursor-pointer rounded-md px-4 py-2 sm:text-xl',
        'bg-blue-600 text-white hover:bg-blue-500',
        'dark:bg-blue-400 dark:text-slate-800 dark:hover:bg-blue-300',
        'transition duration-200 ease-in-out',
        'disabled:cursor-not-allowed disabled:bg-blue-300 dark:disabled:bg-blue-200',
        props.className,
      )}
    >
      {children}
    </button>
  );
};
