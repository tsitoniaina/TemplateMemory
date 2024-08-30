"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import MemoryList from "./MemoryList";

function MemoryPage({ session }: { session: Session | null }) {
  return (
    <SessionProvider session={session}>
      <MemoryList />
    </SessionProvider>
  );
}

export default MemoryPage;
