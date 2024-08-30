'use client';

import Link from 'next/link';
import {useState} from 'react';
import {signIn} from 'next-auth/react';
import {SubmitHandler} from 'react-hook-form';
import {PiArrowRightBold} from 'react-icons/pi';
import {Checkbox, Password, Button, Input, Text} from 'rizzui';
import {Form} from '@ui/../../../../../packages/isomorphic-core/src/ui/form';
import {routes} from '@/config/routes.ts';
import {loginSchema, LoginSchema} from '@/validators/login.schema.ts';
import {Loader2} from 'lucide-react'
import {useFormState} from "react-dom";
import {signInUser} from "@/app/actions/user/security.action.ts";

const initialValues: LoginSchema = {
    email: "tiana.randrianarivony@gmail.com",
    password: "A132bcdef",
    rememberMe: true,
};

export default function SignInForm() {
    //TODO: why we need to reset it here
    const [reset, setReset] = useState({});

    const [, signInAction] = useFormState(signInUser, undefined)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
        setIsSubmitting(true)
        signInAction(data)

    };
console.log('submit', isSubmitting)
    return (
        <>
            <Form<LoginSchema>
                validationSchema={loginSchema}
                resetValues={reset}

                onSubmit={onSubmit}
                useFormProps={{
                    defaultValues: initialValues,
                    disabled: isSubmitting
                }}
            >
                {({register, formState: {errors}}) => (
                    <div className="space-y-5">
                        <Input
                            type="email"
                            size="lg"
                            label="Email"
                            placeholder="Enter your email"
                            className="[&>label>span]:font-medium"
                            inputClassName="text-sm"
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
                        <div className="flex items-center justify-between pb-2">
                            <Checkbox
                                {...register('rememberMe')}
                                label="Remember Me"
                                className="[&>label>span]:font-medium"
                            />
                            <Link
                                href={routes.forgotPassword}
                                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
                            >
                                Forget Password?
                            </Link>
                        </div>
                        <Button className="w-full" type="submit" size="lg">
                            {isSubmitting ? <Loader2 className='w-5 h-5 animate-spin'/> : <>
                                <span>Sign in</span>{' '}
                                <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5"/>
                            </>
                            }
                        </Button>
                    </div>
                )}
            </Form>
            <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
                Don’t have an account?{' '}
                <Link
                    href={routes.signUp}
                    className="font-semibold text-gray-700 transition-colors hover:text-blue"
                >
                    Sign Up
                </Link>
            </Text>
        </>
    );
}
