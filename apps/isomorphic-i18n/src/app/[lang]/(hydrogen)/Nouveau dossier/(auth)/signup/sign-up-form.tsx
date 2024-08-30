'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Password, Button, Input, Text } from 'rizzui';
import { Form } from '@ui/form.tsx';
import { routes } from '@/config/routes.ts';
import { SignUpSchema, signUpSchema } from '@/validators/signup.schema.ts';
import axios from 'axios';

const initialValues = {
  email: '',
  password: '',
  name: '',
  firstName: '',
};

export default function SignUpForm() {
  const [reset, setReset] = useState({});
  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    console.log('Submitting data:', data);
  
    try {
      const response = await axios.post(`http://localhost:2222/api/user/create`, data);
      console.log("Response Data:", response);
      
    } catch (error) {
    }
  
  };
  
  return (
    <>
      <Form<SignUpSchema>
        validationSchema={signUpSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="flex flex-col gap-x-4 gap-y-5 md:grid md:grid-cols-2 lg:gap-5">
            <Input
              type="text"
              size="lg"
              label="First Name"
              placeholder="Enter your first name"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('firstName')}
              error={errors.firstName?.message}
            />
            <Input
              type="text"
              size="lg"
              label="Name"
              placeholder="Enter your name"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('name')}
              error={errors.name?.message}
            />
            <Input
              type="email"
              size="lg"
              label="Email"
              className="col-span-2 [&>label>span]:font-medium"
              inputClassName="text-sm"
              placeholder="Enter your email"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('password')}
              error={errors.password?.message}
            />
            <Button size="lg" type="submit" className="col-span-2 mt-2">
              <span>Get Started</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Don’t have an account?{' '}
        <Link
          href={routes.signIn}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}

