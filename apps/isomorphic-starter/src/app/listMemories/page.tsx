"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { fetchMemories } from '@/app/services/memories/memoryService';

interface Memory {
  id: number;
  memory: string;
  post_at: string;
}

const MemoriesList = () => {
  const { data: session } = useSession();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiToken = session?.payloads?.apiToken;
        if (!apiToken) {
          throw new Error("Token manquant");
        }

        const data = await fetchMemories(apiToken);
        setMemories(data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Memories List</h1>
      <ul className="list-unstyled">
        {memories.map(memory => (
          <li key={memory.id} className="mb-3 p-3 border rounded">
            <p>{memory.memory}</p>
            <p><small className="text-muted">{new Date(memory.post_at).toLocaleString()}</small></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemoriesList;
