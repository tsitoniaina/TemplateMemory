import {Title} from "rizzui";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/[lang]/api/auth/[...nextauth]/auth-options";

export default async function Home({...ad}) {
    const a = await getServerSession(authOptions)
    console.log('mljm')
    console.log(a)
    return (
        <>
            <Title>dashboard {JSON.stringify(a)}</Title>
        </>
    );
}
