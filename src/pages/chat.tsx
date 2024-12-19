import { io } from "socket.io-client";
import React from "react";
import { useState, useEffect } from "react";

const socket = io("http://localhost:3000");

function Chat() {
  const [messages, setMessages] = useState<
    { message: string; sender: string }[]
  >([]); // Array de mensajes con campo 'sender'
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState<"user1" | "user2" | null>(
    null
  ); // Usuario actual (se asigna automáticamente)

  // Escuchar el evento de conexión para recibir el rol del usuario
  useEffect(() => {
    socket.on("assignRole", (role: "user1" | "user2") => {
      setCurrentUser(role);
    });

    // Escuchar mensajes previos al conectar
    socket.on(
      "previousMessages",
      (messages: { message: string; sender: string }[]) => {
        setMessages(messages);
      }
    );

    // Escuchar nuevos mensajes
    socket.on(
      "receiveMessage",
      (message: { message: string; sender: string }) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    );

    return () => {
      socket.off("assignRole");
      socket.off("previousMessages");
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() && currentUser) {
        const message = {
            message: newMessage,
            sender: currentUser,
        };
        socket.emit('newMessage', message); // Solo envía el mensaje al servidor
        setNewMessage(''); // Limpia el input
    }
};


  if (currentUser === null) {
    return <div>Cargando...</div>; // Espera a que el servidor asigne el rol
  }

  return (

    
    <div className="flex h-screen overflow-hidden">

      {/* <!-- Sidebar --> */}
    <div className="bg-white border-r border-gray-300" style={{width:"13.633%"}}
    >
      {/* <!-- Sidebar Header --> */}
      <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
        <h1 className="text-2xl font-semibold">Chat Web</h1>
        <div className="relative">
          <button id="menuButton" className="focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-100" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
            </svg>
          </button>
          {/* <!-- Menu Dropdown --> */}
          <div id="menuDropdown" className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden">
            <ul className="py-2 px-3">
              <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 1</a></li>
              <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 2</a></li>
              {/* <!-- Add more menu options here --> */}
            </ul>
          </div>
        </div>
      </header>
    </div>
      <div className="flex-1">
      <header className="bg-white p-4 text-gray-700 w-full">
  <h1 className="text-2xl font-semibold text-right relative z-[9999] text-black">
    Chat - {currentUser === "user1" ? "Usuario 1" : "Usuario 2"}
  </h1>
</header>


        <div className="bg-slate-300 h-screen overflow-y-auto p-4 pb-36">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-4 ${
                msg.sender === "user1" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`flex max-w-96 rounded-lg p-3 gap-3 ${
                  msg.sender === "user1"
                    ? "bg-white text-gray-800"
                    : "bg-indigo-400 text-white"
                }`}
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center">
                  <img
                    src={
                      msg.sender === "user1"
                        ? "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                        : "https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                    }
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
                <p>{msg.message}</p>
              </div>
            </div>
          ))}
        </div>

        <footer className="bg-white border-t border-gray-300 p-4 absolute right-0 bottom-0"   style={{ width: "85%" }}
        >
          <div className="flex items-center">
            <input
              type="text"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
              placeholder="Type a message..."
              className="w-full bg-slate-200 p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={sendMessage}
              className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
            >
              Enviar
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Chat;
