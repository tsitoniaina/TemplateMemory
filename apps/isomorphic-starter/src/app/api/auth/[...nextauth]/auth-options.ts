import {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {jwtDecode} from 'jwt-decode'
import {pagesOptions} from './pages-options';
import {routes} from "@/config/routes.ts";
import * as process from "node:process";

const axios = require('axios').default;

export const authOptions: NextAuthOptions = {
    debug: true,
    pages: {
        ...pagesOptions,
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async session({session, token}) {

            const {apiToken, ...rest} = token
            return {
                ...session,
                apiToken,
                payloads: rest.payloads
            };
        },

        async jwt({token, user, ...rest}) {
            if (user) {
                token.payloads = user;
                axios.defaults.headers['Authorization'] = `Bearer ${user.apiToken}`
            }
            return token;
        },
        async redirect({url, baseUrl,}) {
            console.log(url, baseUrl)
            return baseUrl + routes.dashboard;
        },
    },
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {},
            async authorize(credentials: any) {
                try {
                    // You need to provide your own logic here that takes the credentials
                    // submitted and returns either a object representing a user or value
                    // that is false/null if the credentials are invalid
                    const query = await axios.post(`${process.env.API_URL}/api/login_check`, credentials, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                    const {email} = credentials
                    const payloads = jwtDecode<{ firstname: string, name: string }>(query.data.token)
                    return ({email, apiToken: query.data.token, ...payloads});
                } catch (error) {
                    return null
                }

            },
        })
    ],
};
