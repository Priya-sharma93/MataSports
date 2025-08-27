import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ChatContext } from './ChatContex';

const ChatStateProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState("");
  const [user, setUser] = useState(null);
  const [recipient, setRecipient] = useState(null);

  // Connect WebSocket with retry
  const connectWebSocket = (localUser) => {
    const newSocket = new WebSocket("ws://localhost:10000"); 
    // const newSocket = new WebSocket("wss://onetoone-m2jw.onrender.com");

    socketRef.current = newSocket;

    newSocket.onopen = () => {
      console.log("✅ WebSocket connected!");
      newSocket.send(JSON.stringify(localUser)); // Identify user
    };

    newSocket.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };

    newSocket.onclose = (event) => {
      console.warn("⚠️ WebSocket closed, retrying in 2s...", event.code);
      setTimeout(() => connectWebSocket(localUser), 2000); // reconnect after 2s
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "chat") {
        setMessages((prev) => [...prev, { sender: data.from, message: data.message }]);
      } else if (data.type === "typing") {
        setTyping(`${data.sender.name} is typing...`);
        setTimeout(() => setTyping(""), 1500);
      } else if (data.type === "history") {
        setMessages(data.messages || []);
      }
      console.log("📩 Message Received:", data);
    };
  };

  useEffect(() => {
    const localUser = {
      id: parseInt(localStorage.getItem("user_id")),
      role: localStorage.getItem("user_type"),
      name: localStorage.getItem("user_name"),
    };
    setUser(localUser);

    const coachUser = JSON.parse(localStorage.getItem("coach_profile"));
    if (coachUser) {
      setRecipient({
        id: coachUser.id,
        role: "coach",
        name: coachUser.name,
      });
    }

    // Connect WebSocket on load
    if (localUser?.id) {
      connectWebSocket(localUser);
    }

    // Cleanup socket on unmount
    return () => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    };
  }, []);

  const handleSendMassage = (newMsg) => {
    if (
      newMsg.trim() &&
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN &&
      user &&
      recipient
    ) {
      const payload = {
        type: "chat",
        sender: user,
        to: recipient,
        message: newMsg.trim(),
      };
      socketRef.current.send(JSON.stringify(payload));
      setMessages((prevMessages) => [...prevMessages, { sender: user, message: newMsg.trim() }]);
    }
  };

  return (
    <ChatContext.Provider value={{ socketRef, messages, typing, handleSendMassage, recipient, user }}>
      {children}
    </ChatContext.Provider>
  );
};

ChatStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChatStateProvider;
