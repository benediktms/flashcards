import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../components/Button';
import { signupSchema } from '../validators/auth-schema';
import type { SignUpSchemaType } from '../validators/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField } from '../components/InputField';
import { LoadingSpinner } from '../components/LoadingSpinner';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignUpSchemaType>({
    mode: 'onBlur',
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
            <InputField
              disabled={isSubmitting}
              {...register('name', { required: true })}
              type="text"
              name="name"
              placeholder="Name"
            />
            <p className="text-red-500">{errors.name?.message}</p>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Email
            </label>
            <InputField
              disabled={isSubmitting}
              {...register('email', { required: true })}
              type="text"
              name="email"
              placeholder="Email address"
            />
            <p className="text-red-500">{errors.email?.message}</p>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Password
            </label>
            <InputField
              disabled={isSubmitting}
              {...register('password', { required: true })}
              type="password"
              name="password"
              placeholder="Password"
            />
            <p className="text-red-500">{errors.password?.message}</p>
            <label
              htmlFor="passwordConfirmation"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Confirm password
            </label>
            <InputField
              disabled={isSubmitting}
              {...register('passwordConfirmation', { required: true })}
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm password"
            />
            <p className="text-red-500">
              {errors.passwordConfirmation?.message}
            </p>

            <Button type="submit" disabled={isSubmitting} className="mt-3">
              Sign up
            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="mt-3"
            >
              {isSubmitting ? <LoadingSpinner /> : 'Sign Up'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
