"use client";

import { useEffect, useState } from 'react';
import ApiMemory from '@/app/api/memories/memories';

interface Memory {
    id: number;
    memory: string;
    post_at: string;
}

const HomePage = () => {
    const [memories, setMemories] = useState<Memory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMemories = async () => {
            try {
                const data = await ApiMemory.allMemory();
                console.log("rogella",data);
                setMemories(data);
            } catch (err: any) {
                if (err.response && err.response.status === 401) {
                    setError("Non autorisé. Veuillez vérifier votre token d'authentification.");
                } else {
                    setError(err.message || 'Une erreur est survenue');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMemories();
    }, []);

    if (loading) {
        return <p>Chargement en cours...</p>;
    }

    if (error) {
        return <p>Erreur : {error}</p>;
    }

    return (
        <div>
            <h1>Liste des Mémoires</h1>
            {memories.length === 0 ? (
                <p>Aucune mémoire trouvée.</p>
            ) : (
                <ul>
                    {memories.map((memory, index) => (
                        <li key={index}>
                            <h2>{memory.memory}</h2>
                            <p>{memory.post_at}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HomePage;
