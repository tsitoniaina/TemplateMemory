import {LoginSchema} from "@/validators/login.schema.ts";
import {signIn} from "next-auth/react";

export async function signInUser(prevState: any, formData: LoginSchema){

    await signIn('credentials', formData)
}