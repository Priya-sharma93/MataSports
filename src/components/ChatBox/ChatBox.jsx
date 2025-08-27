import { useState, useEffect } from "react";
import "../ChatBox/ChatBox.css";
import useChatContext from "./hooks/useChatContext";

const ChatBox = () => {
  const { typing, messages, handleSendMassage, socketRef, recipient, user } = useChatContext();
  // console.log(messages,'messages')
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  // console.log(user, 'user')
  // console.log(recipient, 'recipient')

  useEffect(() => {
    if (!user || !recipient) return;
    fetch(`https://sports-backend-0mgj.onrender.com/chat/history?athlete_id=${user?.id}&coach_id=${recipient?.id}`)
      .then((res) => res.json())
      .then((data) => {
        // Map API data to same structure as websocket messages
        const formatted = data.map((msg) => ({
          id: msg.id,
          message: msg.message,
          sender: msg.sender === "athlete" ? user : recipient,
          timestamp: msg.timestamp,
        }));
        setHistory(formatted);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  }, [user, recipient]);

  const handleTyping = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN && user && recipient) {
      socketRef.current.send(
        JSON.stringify({ type: "typing", sender: user, to: recipient })
      );
    }
  };

  // console.log(messages[0]?.sender?.role)
  const allMessages = [...history, ...messages];

  return (
    <div style={{ width: "80vw", height: "100vh", padding: "20px", background: "#f5f5f5", margin: "auto" }}>
      <h2>Chat Interface</h2>
      <div style={{ height: "80vh", overflowY: "auto", padding: "20px", border: "1px solid #ccc", background: "#fff", borderRadius: "8px" }}>
        {allMessages.map((msg, index) => {
          const isCoach = msg.sender?.role === "coach";
          return (
            <div key={index}
              style={{
                textAlign: !isCoach ? "right" : "left",
                marginBottom: 10,
              }}>
              <div
                style={{
                  display: "inline-block",
                  padding: "10px",
                  borderRadius: 10,
                  backgroundColor: !isCoach ? "#cce5ff" : "#d9fdd3",
                }}
              >
                <strong>{msg.sender?.id === user?.id ? "You" : msg.sender?.name}:</strong> {msg.message} <br />
              </div>
            </div>
          )
        }
        )}
      </div>
      <div>{typing}</div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onInput={handleTyping}
        placeholder="Type a message..."
        autoComplete="off"
      />
      <button
        className="btn-send"
        onClick={() => {
          if (input.trim()) {
            handleSendMassage(input);
            setInput("");
          }
        }}
      >
        Send
      </button>
    </div>
  );
};

export default ChatBox;
