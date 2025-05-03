
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

const chatUsers = ["You", "Rohit Gupta", "Sakshi", "Ankit"];

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
        sender: "Sakshi",
        content: input,
        timestamp: new Date().toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        }),
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
    <div className="h-screen flex flex-col bg-gray-100 font-sans ">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 text-xl font-semibold shadow">
        Realtime Chat App
      </nav>

      {/* Landing Section */}
      <header className="bg-white shadow py-4 text-center flex justify-between items-center px-6">
        <div className="flex-1 text-left ml-6 hidden md:block">
          <h2 className="font-bold text-[20px] ">Chats</h2>
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
                d="M24 23q-1.857 0-3.178-1.322Q19.5 20.357 19.5 18.5t1.322-3.178T24 14t3.178 1.322Q28.5 16.643 28.5 18.5t-1.322 3.178T24 23m-6.75 10q-.928 0-1.59-.66-.66-.662-.66-1.59v-.9q0-.956.492-1.758A3.3 3.3 0 0 1 16.8 26.87a16.7 16.7 0 0 1 3.544-1.308q1.8-.435 3.656-.436 1.856 0 3.656.436T31.2 26.87q.816.422 1.308 1.223T33 29.85v.9q0 .928-.66 1.59-.662.66-1.59.66z"
                fill="#606263"
              />
            </svg>
            <div className="">
              <h1 className="text-[22px] font-semibold ml-3">Sakshi</h1>
              <p className="text-sm flex items-center space-x-2 ml-3">
                {typing ? (
                  <span className="text-gray-500">typing...</span>
                ) : (
                  <>
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-gray-500">Online</span>
                  </>
                )}
              </p>

            </div>
          </div>


        </div>

        <div className="flex-1"></div>
      </header>


      <main className="flex flex-1 overflow-hidden">
        {/* Online Users */}
        <aside className="w-70 bg-white border-r p-4 overflow-y-auto hidden md:block">

          <ul className="space-y-2 ">
            {onlineUsers.map((user, i) => (
              <li
                key={i}
                className="flex items-center space-x-4 py-2 pl-2 shadow-sm text-gray-700 cursor-pointer hover:bg-blue-100 rounded-lg"
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
                        d="M24 23q-1.857 0-3.178-1.322Q19.5 20.357 19.5 18.5t1.322-3.178T24 14t3.178 1.322Q28.5 16.643 28.5 18.5t-1.322 3.178T24 23m-6.75 10q-.928 0-1.59-.66-.66-.662-.66-1.59v-.9q0-.956.492-1.758A3.3 3.3 0 0 1 16.8 26.87a16.7 16.7 0 0 1 3.544-1.308q1.8-.435 3.656-.436 1.856 0 3.656.436T31.2 26.87q.816.422 1.308 1.223T33 29.85v.9q0 .928-.66 1.59-.662.66-1.59.66z"
                        fill="#606263"
                      />
                    </svg>
                  </div>
                </div>

                {/* User info */}
                <div className="flex-1 cursor-pointer">
                  <span className="block  font-semibold " title={`User: ${user}`}>{user}</span>
                  <p
                    className="text-sm text-[#686969] truncate max-w-[200px]"
                    title={typing ? "Typing..." : "Latest Message from this user"}
                  >
                    {typing ? "Typing..." : "Latest Message from this user".slice(0, 20) + ("Latest Message from this user".length > 20 ? "..." : "")}
                  </p>

                </div>

              </li>
            ))}
          </ul>

        </aside>

        {/* Chat Box */}
        <section className="flex-1 flex flex-col justify-between p-4">
          <div className="overflow-y-auto space-y-2 p-3 flex-1">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative px-4 py-2 rounded-xl text-white max-w-[80%] w-fit
        ${msg.sender === "You" ? "ml-auto bg-[#005c4b]" : "mr-auto bg-[#202c33]"}
        text-sm sm:text-base
      `}
              >
                <div className="break-words whitespace-pre-wrap">{msg.content} {msg.emoji || ""}</div>
                <div className="text-[11px] text-gray-400 text-right mt-1">{msg.timestamp}</div>
              </motion.div>
            ))}
            <div ref={messageEndRef} />
          </div>



          {/* Chat Input */}
          <div className="relative w-full px-4 py-2">
            <div className="flex items-center bg-white text-gray-500 rounded-full px-3 py-2 w-full">
              {/* Emoji Button */}
              <button
                onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
                className="text-2xl mr-2 cursor-pointer"
                title="Add emoji"
              >
                😊
              </button>

              {/* Emoji Picker */}
              {emojiPickerOpen && (
                <div className="absolute bottom-14 left-10 bg-white p-2 rounded shadow flex space-x-1 z-50">
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

              {/* Input Field */}
              <input
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setTyping(true);
                }}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message"
                className="flex-1 bg-transparent outline-none text-black placeholder:text-gray-400 h-[40px]"
              />

              {/* Send Button */}
              {input.trim() && (
                <button
                  onClick={sendMessage}
                  className="ml-2 w-10 h-10 bg-green-500 text-black rounded-full flex items-center justify-center hover:bg-green-600 transition cursor-pointer"
                  title="Send"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 rotate-45"
                  >
                    <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                  </svg>
                </button>
              )}

            </div>
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
