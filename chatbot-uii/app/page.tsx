"use client";

import { useState } from "react";
import { ChatCompletionMessage } from "./chat-completion-message.interface";
import createChatCompletion from "./createChatCompletion";

export default function Home() {
  const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);
  const [message, setMessage] = useState("");

  const handleMessage = async () => {
    const updatedMessages = [
      ...messages,
      {
        role: "user",
        content: message,
      },
    ];
    setMessages(updatedMessages);
    setMessage("");
    const response = (await createChatCompletion(updatedMessages)).choices[0]
      ?.message;
    setMessages([...updatedMessages, response]);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 h-screen flex flex-col items-center p-6 text-gray-300 font-sans">
      <h1 className="text-5xl font-bold text-center text-gray-100 mb-8 tracking-wide relative">
        How can I help you today? 🤖
      </h1>

      <div className="flex-1 w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-6 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-start" : "justify-end"
            } mb-4`}
          >
            <div
              className={`p-4 rounded-xl text-sm max-w-xs ${
                message.role === "user"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-700 text-gray-200 shadow-md"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center mt-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              await handleMessage();
            }
          }}
          className="w-full p-3 border border-gray-600 rounded-lg text-gray-300 bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none mr-2"
        />
        <button
          onClick={handleMessage}
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-400 transition-all transform hover:scale-105"
        >
          Send
        </button>
      </div>
    </div>
  );
}
