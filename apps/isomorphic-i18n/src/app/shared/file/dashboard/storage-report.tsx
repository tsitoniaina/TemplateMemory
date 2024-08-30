// "use client";

// import WidgetCard from "@components/cards/widget-card";
// import { Title, Text } from "rizzui";
// import cn from "@utils/class-names";
// import { useMedia } from "@hooks/use-media";
// import SimpleBar from "@ui/simplebar";
// import { useTranslation } from "@/app/i18n/client";
// import { useEffect, useState } from "react";
// import ApiMemory from "@/app/api/memories/memories";
// import { fetchMemories, createMemory } from "@/app/api/memories/memoryService";

// const initialMessages = [
//   {
//     id: 1,
//     user: "Tsiahy",
//     avatar: "https://randomuser.me/api/portraits/men/51.jpg",
//     message: "Bienvenue ! Ajoutez un événement de votre vie.",
//     time: "10:30 AM",
//     alignment: "left",
//   }
// ];

// interface Memory {
//   id: number;
//   memory: string;
//   post_at: string;
// }

// export default function ChatWidget({
//   className,
//   lang,
// }: {
//   className?: string;
//   lang?: string;
// }) {
//   const [messages, setMessages] = useState(initialMessages);
//   const [newMessage, setNewMessage] = useState("");
//   const isMobile = useMedia("(max-width: 768px)", false);
//   const { t } = useTranslation(lang!, "common");

//   const [memories, setMemories] = useState<Memory[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const handleSendMessage = async () => {
//     if (newMessage.trim() === "") return;
    
//     const nextMessage = {
//       id: messages.length + 1,
//       user: "Memory",
//       message: newMessage,
//       time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//       alignment: "right",
//     };

//     setMessages((prevMessages) => [...prevMessages, nextMessage]);
//     setNewMessage("");

//     try {
//       const memoryParams = {
//           description: newMessage, 
//           date: new Date().toISOString() 
//       };

//       await ApiMemory.memory(memoryParams);
//       console.log("Message envoyé et sauvegardé avec succès.");
//     } catch (error) {
//       console.error("Erreur lors de l'envoi du message:", error);
//     }
//   };
  
//   useEffect(() => {
//     const fetchMemories = async () => {
//         try {
//             const data = await ApiMemory.allMemory();
//             setMemories(data);
//             setMessages((prevMessages) => [...prevMessages, ...data.map((memory:Memory) => ({
//                 id: memory.id,
//                 user: "Moi",
//                 message: memory.memory,
//                 time: new Date(memory.post_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//                 alignment: "right",
//             }))]);
//         } catch (err: any) {
//             if (err.response && err.response.status === 401) {
//                 setError("Non autorisé. Veuillez vérifier votre token d'authentification.");
//             } else {
//                 setError(err.message || 'Une erreur est survenue');
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     fetchMemories();
//   }, []);

//   if (loading) {
//       return <p>Chargement en cours...</p>;
//   }

//   if (error) {
//       return <p>Erreur : {error}</p>;
//   }

//   return (
//     <WidgetCard
//       title={t("text-chat")}
//       titleClassName="font-normal text-gray-700 sm:text-base font-inter"
//       descriptionClassName="text-gray-500 mt-1.5"
//       className={className}
//     >
//       <div className="relative">
//         <SimpleBar style={{ maxHeight: 450 }}>
//           <div className="w-full pt-4 min-h-[42em] max-h-[42em]">
//             <div className="space-y-4">
//               {messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={cn(
//                     "flex items-start",
//                     msg.alignment === "left"
//                       ? "text-left"
//                       : "flex-row-reverse text-right"
//                   )}
//                 >
//                   {msg.avatar && (
//                     <img
//                       src={msg.avatar}
//                       alt={msg.user}
//                       className="w-10 h-10 rounded-full mr-4"
//                     />
//                   )}
//                   <div
//                     className={cn(
//                       "p-4 rounded-lg",
//                       msg.alignment === "left"
//                         ? "bg-gray-100 dark:bg-gray-800"
//                         : "bg-blue-100 dark:bg-blue-800"
//                     )}
//                   >
//                     <div className="flex justify-between items-center">
//                       <Text className="font-semibold text-gray-700 dark:text-gray-200">
//                         {msg.user}
//                       </Text>
//                       <Text className="text-sm text-gray-500">{msg.time}</Text>
//                     </div>
//                     <Text className="mt-2 text-gray-600 dark:text-gray-300">
//                       {msg.message}
//                     </Text>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </SimpleBar>
//         <div className="pt-4">
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleSendMessage();
//             }}
//             className="flex items-center space-x-2"
//           >
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder={t("text-type-message")}
//               className="w-full p-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-white dark:border-gray-600"
//             />
//             <button
//               type="submit"
//               className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
//             >
//               {t("text-send")}
//             </button>
//           </form>
//         </div>
//       </div>
//     </WidgetCard>
//   );
// }
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { createMemory, fetchMemories } from "@/app/api/memories/memoryService";
import WidgetCard from "@components/cards/widget-card";
import { Title, Text } from "rizzui";
import cn from "@utils/class-names";
import SimpleBar from "@ui/simplebar";
import { useTranslation } from "@/app/i18n/client";
import { useMedia } from "@hooks/use-media";

const initialMessages = [
  {
    id: 1,
    user: "Tsiahy",
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
    message: "Bienvenue ! Ajoutez un événement de votre vie.",
    time: "10:30 AM",
    alignment: "left",
  }
];

interface Memory {
  id: number;
  memory: string;
  post_at: string; // Assurez-vous que ce champ est une chaîne de caractères formatée
}

export default function ChatWidget({
  className,
  lang,
}: {
  className?: string;
  lang?: string;
}) {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const isMobile = useMedia("(max-width: 768px)", false);
  const { t } = useTranslation(lang!, "common");

  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const nextMessage = {
      id: messages.length + 1,
      user: "Memory",
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      alignment: "right",
    };

    setMessages((prevMessages) => [...prevMessages, nextMessage]);
    setNewMessage("");

    try {
      if (!session?.payloads?.apiToken) throw new Error("Token manquant");
      const memoryParams = {
        memory: newMessage,
        post_at: new Date().toISOString()
      };

      await createMemory(session.payloads.apiToken, memoryParams);
      console.log("Message envoyé et sauvegardé avec succès.");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
    }
  };

  useEffect(() => {
    const fetchMemoriesData = async () => {
      try {
        if (!session?.payloads?.apiToken) throw new Error("Token manquant");
        const data = await fetchMemories(session.payloads.apiToken);
        setMemories(data);
        setMessages((prevMessages) => [
          ...prevMessages,
          ...data.map((memory: Memory) => ({
            id: memory.id,
            user: "Moi",
            message: memory.memory,
            time: new Date(memory.post_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            alignment: "right",
          })),
        ]);
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

    fetchMemoriesData();
  }, [session?.payloads?.apiToken]); 

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  return (
    <WidgetCard
      title={t("text-chat")}
      titleClassName="font-normal text-gray-700 sm:text-base font-inter"
      descriptionClassName="text-gray-500 mt-1.5"
      className={className}
    >
      <div className="relative">
        <SimpleBar style={{ maxHeight: 450 }}>
          <div className="w-full pt-4 min-h-[42em] max-h-[42em]">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex items-start",
                    msg.alignment === "left"
                      ? "text-left"
                      : "flex-row-reverse text-right"
                  )}
                >
                  {msg.avatar && (
                    <img
                      src={msg.avatar}
                      alt={msg.user}
                      className="w-10 h-10 rounded-full mr-4"
                    />
                  )}
                  <div
                    className={cn(
                      "p-4 rounded-lg",
                      msg.alignment === "left"
                        ? "bg-gray-100 dark:bg-gray-800"
                        : "bg-blue-100 dark:bg-blue-800"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <Text className="font-semibold text-gray-700 dark:text-gray-200">
                        {msg.user}
                      </Text>
                      <Text className="text-sm text-gray-500">{msg.time}</Text>
                    </div>
                    <Text className="mt-2 text-gray-600 dark:text-gray-300">
                      {msg.message}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SimpleBar>
        <div className="pt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={t("text-type-message")}
              className="w-full p-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              {t("text-send")}
            </button>
          </form>
        </div>
      </div>
    </WidgetCard>
  );
}
