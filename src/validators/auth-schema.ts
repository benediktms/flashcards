import { z } from 'zod';

export const signupSchema = z
  .object({
    name: z.string().min(2, { message: 'Please enter your name' }),
    email: z.string().email(),
    password: z.string().refine(
      (password) => {
        const hasNumber = /\d/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
          password,
        );
        const hasMinLength = password.length >= 8;
        return (
          hasNumber &&
          hasUppercase &&
          hasLowercase &&
          hasSpecial &&
          hasMinLength
        );
      },
      {
        message:
          'Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character',
      },
    ),
    passwordConfirmation: z.string(),
  })
  .refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    {
      message: 'Passwords do not match',
      path: ['passwordConfirmation'],
    },
  );

export type SignUpSchemaType = z.infer<typeof signupSchema>;
