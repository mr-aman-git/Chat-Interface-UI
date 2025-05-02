// import React from 'react'

// const page = () => {
//   return (
//     <div>page</div>
//   )
// }

// export default page

"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

type Message = {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  emoji?: string;
};

const chatUsers = ["You", "Alex", "Riya", "Sam"];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [onlineUsers] = useState(chatUsers);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (input.trim()) {
      const newMsg: Message = {
        id: Date.now(),
        sender: "You",
        content: input,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, newMsg]);
      setInput("");
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const typingTimer = setTimeout(() => setTyping(false), 1000);
    return () => clearTimeout(typingTimer);
  }, [input]);

  const addEmoji = (emoji: string) => {
    setInput((prev) => prev + emoji);
    setEmojiPickerOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 font-sans">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 text-xl font-semibold shadow">
        Realtime Chat App
      </nav>

      {/* Landing Section */}
      <header className="bg-white shadow  text-center">
        <h1 className="text-2xl font-semibold mb-2">Alex 👋</h1>
        <p className="text-gray-600 text-sm">Chat in realtime with your friends!</p>
      </header>

      <main className="flex flex-1 overflow-hidden">
        {/* Online Users */}
        <aside className="w-64 bg-white border-r p-4 overflow-y-auto hidden md:block">
          <h2 className="font-bold text-[20px] mb-2 p-4">Chats</h2>
          <ul className="space-y-2">
            {onlineUsers.map((user, i) => (
              <li
                key={i}
                className="flex items-center space-x-2 p-5 border-b text-gray-700"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="">{user}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Chat Box */}
        <section className="flex-1 flex flex-col justify-between p-4">
          <div className="overflow-y-auto space-y-3 mb-4 flex-1">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`max-w-sm p-3 rounded-lg shadow ${
                  msg.sender === "You"
                    ? "ml-auto bg-blue-100"
                    : "mr-auto bg-gray-200"
                }`}
              >
                <div className="font-medium text-sm">{msg.sender}</div>
                <div className="text-base">{msg.content} {msg.emoji || ""}</div>
                <div className="text-xs text-right text-gray-500">
                  {msg.timestamp}
                </div>
              </motion.div>
            ))}
            <div ref={messageEndRef} />
            {typing && (
              <div className="text-gray-500 text-sm italic">Someone is typing...</div>
            )}
          </div>

          {/* Chat Input */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
              className="text-xl"
              title="Add emoji"
            >
              😊
            </button>

            {emojiPickerOpen && (
              <div className="absolute bottom-20 left-4 bg-white p-2 rounded shadow flex space-x-1">
                {["😀", "😎", "🔥", "❤️", "😂", "👍"].map((e) => (
                  <button
                    key={e}
                    onClick={() => addEmoji(e)}
                    className="text-2xl hover:scale-110 transition-transform"
                  >
                    {e}
                  </button>
                ))}
              </div>
            )}

            <input
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setTyping(true);
              }}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 p-2 rounded border"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-3">
        Made By Aman | Chat App © 2025
      </footer>
    </div>
  );
}
