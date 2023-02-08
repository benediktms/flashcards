import * as React from 'react';
import type { Path, UseFormRegister } from 'react-hook-form';

import { cn } from '@/utils/cn';

import { Label } from './Label';

type Props<T extends Record<string, unknown>> =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    register?: UseFormRegister<T>;
    path?: Path<T>;
    label?: string;
    required?: boolean;
    error?: string;
  };

export const Textarea: <T extends Record<string, string>>(
  props: Props<T>,
) => JSX.Element = ({
  register,
  path,
  required,
  label,
  error,
  className,
  ...props
}) => {
  return (
    <span className="w-full">
      <Label
        htmlFor={path}
        className={cn(
          'mb-2 block text-sm font-bold',
          'text-gray-700 dark:text-gray-300',
        )}
      >
        {label}
      </Label>
      <textarea
        {...props}
        {...(register && path ? register(path) : { required })}
        name={path}
        id={path}
        className={cn(
          'flex h-20 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900',
          'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:dark:bg-slate-700 disabled:dark:text-gray-400',
          className,
        )}
        {...props}
      />
      {error && <p className="text-red-500">{error}</p>}
    </span>
  );
};
