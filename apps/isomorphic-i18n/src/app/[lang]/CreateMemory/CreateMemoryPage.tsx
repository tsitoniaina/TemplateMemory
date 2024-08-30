"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { createMemory } from "@/app/api/memories/memoryService";

interface MemoryParams {
  memory: string;
  post_at: string;
}

const CreateMemoryPage = () => {
  const { data: session, status } = useSession();
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newMessage.trim() === "") return;

    if (status === "authenticated" && session?.payloads?.apiToken) {
      setLoading(true);

      const memoryParams: MemoryParams = {
        memory: newMessage,
        post_at: new Date().toISOString(),
      };

      try {
        await createMemory(session.payloads.apiToken, memoryParams);
        setSuccess("Memory created successfully!");
        setNewMessage("");
      } catch (err) {
        setError("Error creating memory");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Not authenticated or API token missing");
    }
  };

  return (
    <div>
      <h1>Create a New Memory</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your memory here..."
          rows={4}
          cols={50}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default CreateMemoryPage;
