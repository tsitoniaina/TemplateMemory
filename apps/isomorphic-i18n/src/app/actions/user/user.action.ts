'use server'

import {redirect} from 'next/navigation'
import {routes} from "@/config/routes.ts";
import {SignUpSchema} from "@/validators/signup.schema.ts";
import * as process from "node:process";

export async function createUser(prevState: any, formData: SignUpSchema) {
    console.log(prevState)
    console.log(formData)
    console.log(process.env.API_URL)


    redirect(routes.signIn)
}

