"use client";

import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import CreateMemoryPage from "./CreateMemoryPage";

function CreateMemoryPageWrapper ({ session }: { session: Session | null }){
  return (
    <SessionProvider session={session}>
      <CreateMemoryPage />
    </SessionProvider>
  );
};

export default CreateMemoryPageWrapper;