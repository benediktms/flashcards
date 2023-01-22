import React from 'react';
import { cn } from '../utils/cn';

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({ children, ...props }: Props) => {
  return (
    <button
      {...props}
      className={cn(
        'cursor-pointer rounded-md p-4',
        'bg-blue-600 text-white',
        'transition duration-200 ease-in-out hover:bg-blue-500',
        'disabled:cursor-not-allowed disabled:bg-blue-300',
        props.className,
      )}
    >
      {children}
    </button>
  );
};
