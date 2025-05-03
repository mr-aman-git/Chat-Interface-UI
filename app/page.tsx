
"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaCamera } from "react-icons/fa";


type Message = {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  emoji?: string;
};

const chatUsers = ["You", "Rohit Gupta", "Riya", "Sam"];

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
      <header className="bg-white shadow py-4 text-center flex justify-between items-center px-6">
        <div className="flex-1 text-left ml-6">
          <h2 className="font-bold text-[20px]">Chats</h2>
        </div>

        <div className="flex-1 text-center">
          <div className="flex">
            {/* SVG icon inside avatar */}
            <svg
              viewBox="0 0 48 48"
              width="45"
              height="45"
              fill="none"
              className="text-gray-600 w-[45px] rounded-full bg-gray-300 items-center justify-center overflow-hidden"
            >
              <title>Profile</title>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.822 21.678Q19.143 23 21 23t3.178-1.322T25.5 18.5t-1.322-3.178Q22.857 14 21 14t-3.178 1.322T16.5 18.5t1.322 3.178M12.66 32.34q.66.66 1.589.661h13.5q.928 0 1.59-.66.66-.662.66-1.59v-.9q0-.956-.492-1.758A3.3 3.3 0 0 0 28.2 26.87a16.7 16.7 0 0 0-3.544-1.308q-1.8-.435-3.656-.436-1.856 0-3.656.436T13.8 26.869a3.3 3.3 0 0 0-1.308 1.223A3.3 3.3 0 0 0 12 29.85v.9q0 .928.66 1.59m21.09.66h-2.392A4.16 4.16 0 0 0 32 30.75v-.9c0-1-.263-1.95-.788-2.804a5.3 5.3 0 0 0-1.675-1.713q.563.093 1.119.228 1.8.436 3.544 1.308.815.422 1.308 1.223.492.802.492 1.758v.9q0 .928-.661 1.59-.66.66-1.59.66M27 23a4.6 4.6 0 0 1-1.18-.147c1.105-1.211 1.68-2.692 1.68-4.353s-.575-3.142-1.68-4.353A4.6 4.6 0 0 1 27 14q1.856 0 3.178 1.322Q31.5 16.643 31.5 18.5t-1.322 3.178T27 23"
                fill="#606263"
              />
            </svg>
            <div>
              <h1 className="text-2xl font-semibold ml-2">Rohit Gupta</h1>
              <p className="text-gray-500 text-sm">{typing ? "Rohit Gupta is typing..." : "Online"}</p>
            </div>
          </div>


        </div>

        <div className="flex-1"></div>
      </header>


      <main className="flex flex-1 overflow-hidden">
        {/* Online Users */}
        <aside className="w-64 bg-white border-r p-4 overflow-y-auto hidden md:block">

          <ul className="space-y-2">
            {onlineUsers.map((user, i) => (
              <li
                key={i}
                className="flex items-center space-x-4 py-5 border-b text-gray-700"
              >
                {/* Avatar container */}
                <div className="relative w-12 h-12">
                  {/* Avatar circle */}
                  <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    {/* SVG icon inside avatar */}
                    <svg
                      viewBox="0 0 48 48"
                      width="70"
                      height="70"
                      fill="none"
                      className="text-gray-600 cursor-pointer"
                    >
                      <title>profile</title>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.822 21.678Q19.143 23 21 23t3.178-1.322T25.5 18.5t-1.322-3.178Q22.857 14 21 14t-3.178 1.322T16.5 18.5t1.322 3.178M12.66 32.34q.66.66 1.589.661h13.5q.928 0 1.59-.66.66-.662.66-1.59v-.9q0-.956-.492-1.758A3.3 3.3 0 0 0 28.2 26.87a16.7 16.7 0 0 0-3.544-1.308q-1.8-.435-3.656-.436-1.856 0-3.656.436T13.8 26.869a3.3 3.3 0 0 0-1.308 1.223A3.3 3.3 0 0 0 12 29.85v.9q0 .928.66 1.59m21.09.66h-2.392A4.16 4.16 0 0 0 32 30.75v-.9c0-1-.263-1.95-.788-2.804a5.3 5.3 0 0 0-1.675-1.713q.563.093 1.119.228 1.8.436 3.544 1.308.815.422 1.308 1.223.492.802.492 1.758v.9q0 .928-.661 1.59-.66.66-1.59.66M27 23a4.6 4.6 0 0 1-1.18-.147c1.105-1.211 1.68-2.692 1.68-4.353s-.575-3.142-1.68-4.353A4.6 4.6 0 0 1 27 14q1.856 0 3.178 1.322Q31.5 16.643 31.5 18.5t-1.322 3.178T27 23"
                        fill="#606263"
                      />
                    </svg>
                  </div>
                </div>

                {/* User info */}
                <div className="flex-1">
                  <span className="block font-medium">{user}</span>
                  <p className="text-sm text-gray-500">Last Message</p>
                </div>
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
                className={`max-w-sm p-3 rounded-lg shadow ${msg.sender === "You"
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
