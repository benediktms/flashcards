import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import type { Path, UseFormRegister } from 'react-hook-form';
import { cn } from '../utils/cn';

type Props<T extends Record<string, string>> = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  register?: UseFormRegister<T>;
  path?: Path<T>;
  required?: boolean;
};

export const InputField: <T extends Record<string, string>>(
  props: Props<T>,
) => JSX.Element = ({ register, path, required, ...props }) => {
  return (
    <input
      {...props}
      {...(register && path ? register(path) : { required })}
      name={path}
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