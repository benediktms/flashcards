import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '../components/Button';
import { signupSchema } from '../validators/auth-schema';
import type { SignUpSchemaType } from '../validators/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '../utils/cn';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(data);
        resolve(undefined);
      }, 3000);
    });
  });

  const inputStyles = cn(
    'mt-1 mb-3 block w-full rounded border border-solid px-4 py-2 w-full',
    ' text-xl font-normal text-gray-700',
    'border-gray-300 bg-white bg-clip-padding',
    'transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none',
    'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400',
  );

  return (
    <div className="my-10 flex flex-col items-center">
      <div className="max-w-md ">
        <h1 className="my-5 text-3xl">Sign Up</h1>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={onSubmit}>
          <div className="mb-6 max-w-sm">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Name
            </label>
            <input
              disabled={isSubmitting}
              {...register('name', { required: true })}
              type="text"
              name="name"
              placeholder="Name"
              className={inputStyles}
            />
            <p className="text-red-500">{errors.name?.message}</p>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Email
            </label>
            <input
              disabled={isSubmitting}
              {...register('email', { required: true })}
              type="text"
              name="email"
              placeholder="Email address"
              className={inputStyles}
            />
            <p className="text-red-500">{errors.email?.message}</p>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Password
            </label>
            <input
              disabled={isSubmitting}
              {...register('password', { required: true })}
              type="password"
              name="password"
              placeholder="Password"
              className={inputStyles}
            />
            <p className="text-red-500">{errors.password?.message}</p>
            <label
              htmlFor="passwordConfirmation"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Confirm password
            </label>
            <input
              disabled={isSubmitting}
              {...register('passwordConfirmation', { required: true })}
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm password"
              className={inputStyles}
            />
            <p className="text-red-500">
              {errors.passwordConfirmation?.message}
            </p>

            <Button type="submit" disabled={isSubmitting} className="mt-3">
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
