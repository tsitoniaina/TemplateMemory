import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validateEmail,
  validatePassword,
  // validateConfirmPassword,
} from './common-rules';

// form zod validation schema
export const signUpSchema = z.object({
  firstName: z.string().min(1, { message: messages.firstNameRequired }),
  name: z.string().optional(), // Optional field, can be omitted in the form
  email: validateEmail, // Ensure this uses your custom email validation rules
  password: validatePassword, // Ensure this uses your custom password validation rules
  // confirmPassword: validateConfirmPassword, // Ensure this uses your custom confirm password validation rules
  // isAgreed: z.boolean().refine(val => val === true, { message: messages.agreementRequired }), // Ensure the user agrees to terms
});

// generate form types from zod validation schema
export type SignUpSchema = z.infer<typeof signUpSchema>;
