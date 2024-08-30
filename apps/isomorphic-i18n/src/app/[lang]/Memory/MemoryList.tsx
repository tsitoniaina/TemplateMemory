"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchMemories } from "@/app/api/memories/memoryService";

interface Memory {
  memory: string;
  post_at: string;
}

const MemoryList = () => {
  const { data: session, status } = useSession();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Session:', session); 
    if (status === "authenticated" && session?.payloads?.apiToken) {
      const getMemories = async () => {
        try {
          const memoriesData = await fetchMemories(session.payloads.apiToken);
          console.log('Fetched memories:', memoriesData);
          setMemories(memoriesData);
        } catch (err) {
          console.error('Error fetching memories:', err); 
          setError("Failed to fetch memories");
        } finally {
          setLoading(false);
        }
      };

      getMemories();
    } else {
      console.log('No valid session or API token');
      setLoading(false); 
    }
  }, [session, status]);

  if (loading) {
    console.log('Loading...');
    return <p>Loading...</p>;
  }

  if (error) {
    console.log('Error:', error);
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Your Memories</h1>
      <ul>
        {memories.map((memory, index) => (
          <li key={index}>
            {memory.memory} - {memory.post_at}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemoryList;

