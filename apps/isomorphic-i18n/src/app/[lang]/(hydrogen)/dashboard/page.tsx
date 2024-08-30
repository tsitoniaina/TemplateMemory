import {Title} from "rizzui";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/[lang]/api/auth/[...nextauth]/auth-options";

export default async function Home() {
    const session = await getServerSession(authOptions)
    return (
        <>
            <Title>dashboard {JSON.stringify(session)}</Title>
        </>
    );
}
