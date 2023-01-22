import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const InputField = (props: Props) => {
  return (
    <input
      {...props}
      className={cn(
        'mt-1 mb-3 block w-full rounded border border-solid px-4 py-2',
        ' text-xl font-normal text-gray-700',
        'border-gray-300 bg-white bg-clip-padding',
        'transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none',
        'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400',
        props.className,
      )}
    />
  );
};
