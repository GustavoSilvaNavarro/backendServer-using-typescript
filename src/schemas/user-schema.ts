import { object, string, number } from 'zod';

export const userSchema = object({
  body: object({
    firstName: string({
      required_error: 'First name is required',
    }),
    lastName: string({
      required_error: 'Last name is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password must have at least 6 characters'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),
    age: number({
      required_error: 'Age is required',
    })
      .int('Age must be an integer')
      .min(12, 'Age must be at least 12years'),
    address: string({
      required_error: 'Address is required',
    }),
    cellphone: string({
      required_error: 'Address is required',
    })
      .min(6, 'Phone number must have at least 6 characters')
      .startsWith('+', 'Should have the code zone'),
  }).refine(data => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
});
