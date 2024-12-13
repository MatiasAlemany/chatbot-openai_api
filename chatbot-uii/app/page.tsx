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
    <div className="bg-gray-900 h-screen flex flex-col items-center p-6 text-gray-300">
      <h1 className="text-5xl font-extrabold text-center text-gray-100 mb-8">
        How can I help you today?
      </h1>
      <div className="flex-1 w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat ${message.role === "user" ? "chat-start" : "chat-end"} mb-4`}
          >
            <div className="chat-bubble p-4 bg-gray-700 text-white rounded-lg">
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center mt-4">
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              await handleMessage();
            }
          }}
          className="w-full p-2 border border-gray-600 rounded-lg text-gray-300 bg-gray-700 mr-2"
        />
        <button
          onClick={handleMessage}
          className="bg-gray-700 text-gray-100 p-2 rounded-lg hover:bg-gray-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
