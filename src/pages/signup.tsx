import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/Button';
import { InputField } from '@/components/InputField';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useNotification } from '@/components/Notification/useNotification';
import { api } from '@/utils/api';
import { normalizeError } from '@/utils/normalize-error';
import { signupSchema, type SignUpSchemaType } from '@/validators/auth-schema';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignUpSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(signupSchema),
  });

  const signup = api.auth.signUp.useMutation();
  const router = useRouter();
  const { notify } = useNotification();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signup.mutateAsync(data);
      notify({
        type: 'success',
        title: 'Success',
        message: 'You have successfully signed up.',
      });
      await router.push('/me');
    } catch (e) {
      const error = normalizeError(e);
      notify({
        type: 'error',
        title: 'Error',
        message: error.message,
      });
    }
  });

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <div className="my-10 flex flex-col items-center">
        <div className="max-w-md ">
          <h1 className="my-5 text-3xl">Sign Up</h1>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={onSubmit}>
            <div className="mb-6 max-w-sm">
              <InputField
                disabled={isSubmitting}
                register={register}
                path="name"
                type="text"
                placeholder="Name"
                label="Name"
                error={errors.name?.message}
              />
              <InputField
                disabled={isSubmitting}
                register={register}
                path="email"
                type="email"
                placeholder="Email address"
                label="Email"
                error={errors.email?.message}
              />
              <InputField
                disabled={isSubmitting}
                register={register}
                path="password"
                type="password"
                placeholder="Password"
                label="Password"
                error={errors.password?.message}
              />
              <InputField
                disabled={isSubmitting}
                register={register}
                path="passwordConfirmation"
                type="password"
                placeholder="Confirm password"
                label="Confirm password"
                error={errors.passwordConfirmation?.message}
              />

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
    </>
  );
};

export default SignUp;
