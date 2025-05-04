
"use client";
import { useState, useEffect, useRef, SetStateAction } from "react";
import { motion } from "framer-motion";
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";



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
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [query, setQuery] = useState("");
  function showContent(data: SetStateAction<string | null>) {
    setSelectedUser(data);
    setShowChat(true)
  }



  const searchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

  };

  const filteredUsers = onlineUsers.filter((user) =>
    user.toLowerCase().includes(query.toLowerCase())
  );

  const handleBack = () => {
    setShowChat(false);
  };

  const sendMessage = () => {
    if (input.trim()) {
      const newMsg: Message = {
        id: Date.now(),
        sender: "You",
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
    <div className="h-screen flex flex-col bg-gray-100 font-sans">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 text-xl font-semibold shadow">
        Realtime Chat App
      </nav>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}


        <aside className={`w-[420px] md:w-[290px] bg-white md:border-r  md:flex flex-col items-center p-4 ${showChat ? "hidden" : "block"} md:block`}>
          <div >
            <h2 className="font-bold text-[20px] mb-4 pl-10">Chats</h2>
            <div className="w-full max-w-md px-4 py-2">

              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  value={query}
                  onChange={searchQuery}
                  placeholder="Search user"
                  className="w-full md:w-auto pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm sm:text-base"
                />
              </div>
            </div>
            <ul className="space-y-2 w-full">
              {filteredUsers.map((user, i) => (
                <li
                  key={i}
                  onClick={() => showContent(user)}
                  className={`flex items-center space-x-4 py-2 md:px-6 p-2 shadow-sm text-gray-700 cursor-pointer hover:bg-blue-100 rounded-lg 
            ${selectedUser === user ? "bg-blue-200" : ""}`}
                >
                  <div className="relative w-12 h-12">
                    <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                      <svg
                        viewBox="0 0 48 48"
                        width="70"
                        height="70"
                        fill="none"
                        className="text-gray-600"
                      >
                        <title>profile</title>
                        <path
                          d="M24 23q-1.857 0-3.178-1.322Q19.5 20.357 19.5 18.5t1.322-3.178T24 14t3.178 1.322Q28.5 16.643 28.5 18.5t-1.322 3.178T24 23m-6.75 10q-.928 0-1.59-.66-.66-.662-.66-1.59v-.9q0-.956.492-1.758A3.3 3.3 0 0 1 16.8 26.87a16.7 16.7 0 0 1 3.544-1.308q1.8-.435 3.656-.436 1.856 0 3.656.436T31.2 26.87q.816.422 1.308 1.223T33 29.85v.9q0 .928-.66 1.59-.662.66-1.59.66z"
                          fill="#606263"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <span className="block font-semibold" title={`User: ${user}`}>{user}</span>
                    <p
                      className="text-sm text-[#686969] truncate max-w-[200px]"
                      title="Latest Message from this user"
                    >
                      {"Latest Message from this user".slice(0, 20) + "..."}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col ">
          {/* Header */}
          {
            selectedUser ? (
              <div className="bg-white shadow flex items-center px-4 h-16">
                <button className="block md:hidden py-2 cursor-pointer" onClick={handleBack}>
                  <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
                </button>
                <svg
                  viewBox="0 0 48 48"
                  width="45"
                  height="45"
                  fill="none"
                  className="text-gray-600 w-[45px] rounded-full bg-gray-300 ml-2 md:ml-0"
                >
                  <title>Profile</title>
                  <path
                    d="M24 23q-1.857 0-3.178-1.322Q19.5 20.357 19.5 18.5t1.322-3.178T24 14t3.178 1.322Q28.5 16.643 28.5 18.5t-1.322 3.178T24 23m-6.75 10q-.928 0-1.59-.66-.66-.662-.66-1.59v-.9q0-.956.492-1.758A3.3 3.3 0 0 1 16.8 26.87a16.7 16.7 0 0 1 3.544-1.308q1.8-.435 3.656-.436 1.856 0 3.656.436T31.2 26.87q.816.422 1.308 1.223T33 29.85v.9q0 .928-.66 1.59-.662.66-1.59.66z"
                    fill="#606263"
                  />
                </svg>
                <div className="ml-3">
                  <h1 className="text-[18px] font-medium"> {selectedUser} </h1>
                  <p className="text-sm flex items-center space-x-2">
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
            ) : (
              <div></div>
            )
          }

          {/* Messages */}

          <div className="flex-1 overflow-y-auto md:p-4 space-y-2 p-2">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative px-4 py-2 rounded-xl text-[#313c31] max-w-[80%] w-fit ${msg.sender === "You" ? "ml-auto bg-blue-100" : "mr-auto bg-[#ffffff]"
                  } text-sm sm:text-base`}
              >
                <div className="break-words whitespace-pre-wrap">
                  {msg.content} {msg.emoji || ""}
                </div>
                <div className="text-[11px] text-gray-400 text-right mt-1">{msg.timestamp}</div>
              </motion.div>
            ))}
            <div ref={messageEndRef} />
          </div>

          {/* Input */}

          {selectedUser ?
            (
              <div className="relative px-4 py-2 bg-white">
                <div className="flex items-center bg-gray-100 text-gray-700 rounded-full px-3 py-2">
                  <button
                    onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
                    className="text-2xl mr-2"
                    title="Add emoji"
                  >
                    😊
                  </button>

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

                  <input
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      setTyping(true);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message"
                    className="flex-1 bg-transparent outline-none text-black placeholder:text-gray-400"
                  />

                  {input.trim() && (
                    <button
                      onClick={sendMessage}
                      className="ml-2 w-10 h-10 bg-green-500 text-black rounded-full flex items-center justify-center hover:bg-green-600"
                      title="Send"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 rotate-45">
                        <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

            ) : (

              <div className="flex flex-col w-full h-[500px]  items-center">
                <div className=" hidden md:block">
                  <img src="/chatImage.png" alt="" className="w-[380px] h-[auto] mix-blend-multiply" />
                  <div className="pt-6 pl-4">
                    <p
                      className="pl-8 font-semibold"
                    >Start a conversation by selecting a user.</p>

                  </div>
                  <p
                    className="pt-2 flex"
                  > <LockClosedIcon className="w-4 h-4 mt-1 mr-0.5" /> Your personal messages are end-to-end encrypted</p>
                </div>
              </div>


            )
          }

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-3 text-sm">
        Made By Aman | Chat App © 2025
      </footer>
    </div>

  );
}
