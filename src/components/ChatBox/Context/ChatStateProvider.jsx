// import { useEffect, useRef, useState } from 'react'
// import PropTypes from 'prop-types';
// import { ChatContext } from './ChatContex';

// const userId = localStorage.getItem("userId"); 
// if (!userId) {
//   console.error("userId not found in localStorage.");
// }


// // const user = { id: "2", role: "athlete", name: "shivani" };
// // const recipient = { id: "7", role: "coach", name: "sanjeev sharma" };

// // localStorage.setItem("userId", userId);
// // localStorage.setItem("userRole", userType);
// // localStorage.setItem("userName", userName);

// // // Retrieving values properly
// // const storedUserId = localStorage.getItem("userId");
// // const storedUserRole = localStorage.getItem("userRole");
// // const storedUserName = localStorage.getItem("userName");

// // // Use the retrieved values
// // const user = { id: storedUserId, role: storedUserRole, name: storedUserName };


// const ChatStateProvider = ({ children }) => {
//     const socketRef = useRef(null)
//     const [messages, setMessages] = useState([]);
//     const [typing, setTyping] = useState("");

//     const handleSendMassage = (newMsg) => {
//         console.log(newMsg, newMsg.trim())
//          if (newMsg.trim() && socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
//             console.log("running....IN >>>.")
//             socketRef.current.send(JSON.stringify({ type: "chat", sender: user, to: recipient, message: newMsg.trim() }));
//             setMessages((prevMessages) => [...prevMessages, { sender: user.name, message: newMsg.trim() }]);
//         }
//         console.log("Sending Message:", JSON.stringify({ type: "chat", sender: user, to: recipient, message: newMsg.trim() }));
//     }

//      useEffect(() => {        
//         const connectWebSocket = () => {
//              const newSocket = new WebSocket("wss://onetoone-fspb.onrender.com");
//             //const newSocket = new WebSocket("ws://localhost:8775");
//             socketRef.current = newSocket

//             newSocket.onopen = () => {
//                 console.log("WebSocket connected!");
//                 newSocket.send(JSON.stringify(user));
//             };

//             newSocket.onerror = (error) => {
//                 console.error("WebSocket error:", error);
//             };

//             newSocket.onclose = (event) => {
//                 console.warn("WebSocket closed:", event);
//                 // setTimeout(connectWebSocket, 3000); // Reconnect after 3 seconds
//                 connectWebSocket()
//             };

//             newSocket.onmessage = (event) => {
//                 const data = JSON.parse(event.data);
//                 if (data.type === "chat") {
//                     setMessages((prev) => [...prev, { sender: data.sender, message: data.message }]);
//                 } else if (data.type === "typing") {
//                     setTyping(`${data.sender} is typing...`);
//                     setTimeout(() => setTyping(""), 1500);
//                 }
//                 console.log("Message Received on Coach Side:", event.data);

//             };
//         };

//         connectWebSocket();

//         return () => {
//             if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
//                 socketRef.current.close();
//             }
//         };

//     }, []);
//   return (
//     <ChatContext.Provider value={{socketRef, messages, typing, handleSendMassage}}>
//         {children}
//     </ChatContext.Provider>
//   )
// }

// ChatStateProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default ChatStateProvider

import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ChatContext } from './ChatContex';

const ChatStateProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState("");
  const [user, setUser] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const [coach, setCoach] = useState();
  const [input, setInput] = useState("");

  // console.log("messages", messages);

  useEffect(() => {
    const localUser = {
      id: parseInt(localStorage.getItem("user_id")),
      role: localStorage.getItem("user_type"),
      name: localStorage.getItem("user_name"),
    };
    setUser(localUser);

    // console.log(localUser, 'localUser')
    const coachUser = JSON.parse(localStorage.getItem("coach_profile"));
    // console.log(coachUser, 'coachUser12121');

    if (coachUser) {
      setRecipient({
        id: coachUser.id,
        role: "coach",
      });
    }

    const connectWebSocket = () => {
      // const newSocket = new WebSocket("wss://onetoone-m2jw.onrender.com");
      const newSocket = new WebSocket("ws://localhost:10000");
      socketRef.current = newSocket;

      newSocket.onopen = () => {
        console.log("WebSocket connected!");
        newSocket.send(JSON.stringify(localUser)); // Identify user
      };

      newSocket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      newSocket.onclose = (event) => {
        console.warn("WebSocket closed:", event);
        // setTimeout(connectWebSocket, 2000);
      };

      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // console.log(data, 'data');
        if (data.type === "chat") {
          setMessages((prev) => [...prev, { sender: data.from, message: data.message }]);
        } else if (data.type === "typing") {
          setTyping(`${data.sender.name} is typing...`);
          setTimeout(() => setTyping(""), 1500);
        }
        else if (data.type === "history") {
          setMessages(data.messages || []);
        }
        console.log("Message Received:", data);
      };
    };

    connectWebSocket();

    return () => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    };
  }, [coach]);

  const handleSendMassage = (newMsg) => {
    // console.log(recipient, 'recipient')
    console.log(user, 'user');
    console.log(recipient, 'recipient');

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

  //  const handleSendMassage = async () => {
  //        if (input.trim()) {
  //            const newMessage = { sender: "You", message: input };
  //            setMessages([...messages, newMessage]); // Store user's message

  //            setTimeout(async () => {
  //                const botReply = await generateBotResponse(input);
  //                setMessages((prevMessages) => [...prevMessages, { sender: "Bot", message: botReply }]);
  //            }, 1000);

  //            setInput("");
  //        }
  //    };

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