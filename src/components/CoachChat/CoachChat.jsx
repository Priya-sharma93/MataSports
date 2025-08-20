import React, { useEffect, useState, useRef, useContext } from "react";
//import ChatContext from "../../components/ChatBox/Context/ChatContext";

const CoachChatBox = () => {
  const [coachUser, setCoachUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [athleteList, setAthleteList] = useState([]);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user_profile"));
    setCoachUser(storedUser);
  }, []);

  useEffect(() => {
    // const ws = new WebSocket("wss://onetoone-m2jw.onrender.com");
    const ws = new WebSocket("ws://localhost:10000");
    setSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket connected");
      // Send coach identity.
      ws.send(
        JSON.stringify({
          id: coachUser.id,
          role: "coach",
          name: coachUser.coach_name,
        })
      );

      // Ask for chat list
      ws.send(
        JSON.stringify({
          type: "get_chat_list",
          id: coachUser.id,
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log(data, 'data');

      if (data.type === "chat_list") {
        setAthleteList(data.athletes || []);
      } else if (data.type === "chat") {
        const incoming = {
          from: data.from,
          message: data.message,
          timestamp: data.timestamp,
        };
        setChatMessages((prev) => [...prev, incoming]);
      } else if (data.type === "chat_history") {
        const history = data.history.map((msg) => ({
          from: msg.from,
          message: msg.message,
          timestamp: msg.timestamp,
        }));
        setChatMessages(history);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => ws.close();
  }, [coachUser]);

  useEffect(() => {
    if (!selectedAthlete || !coachUser) return;

    fetch(
      `https://sports-backend-0mgj.onrender.com/chat/history?athlete_id=${selectedAthlete.id}&coach_id=${coachUser.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((msg) => ({
          id: msg.id,
          message: msg.message,
          from: msg.sender === "coach" ? coachUser : selectedAthlete,
          timestamp: msg.timestamp,
        }));
        setChatMessages(formatted);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  }, [selectedAthlete, coachUser]);

  const sendMessage = () => {
    if (!message.trim() || !selectedAthlete) return;

    const msg = {
      type: "chat",
      message,
      sender: {
        id: coachUser.id,
        role: "coach",
        name: coachUser.coach_name,
      },
      to: {
        id: selectedAthlete.id,
        role: "athlete",
        name: selectedAthlete.name,
      },
    };

    socket.send(JSON.stringify(msg));
    setChatMessages((prev) => [...prev, { from: coachUser, message }]);
    setMessage("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [chatMessages]);

  return (
    <div style={{ display: "flex", height: "90vh" }}>
      {/* Athlete List */}
      <div style={{ width: "25%", borderRight: "1px solid #ccc", padding: 10 }}>
        <h3>Your Athletes</h3>
        {athleteList.map((athlete) => (
          <div
            key={athlete.id}
            onClick={() => {
              setSelectedAthlete(athlete);
              // setChatMessages([]); // Optional: clear previous messages
              if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(
                  JSON.stringify({
                    type: "get_chat_history",
                    from: coachUser.id,
                    to: athlete.id,
                  })
                );
              }
            }}
            style={{
              padding: "8px",
              margin: "5px 0",
              cursor: "pointer",
              backgroundColor:
                selectedAthlete?.id === athlete.id ? "#e0e0ff" : "#f9f9f9",
              borderRadius: 5,
            }}
          >
            {athlete.name}
          </div>
        ))}
      </div>

      {/* Chat Box */}
      <div style={{ flexGrow: 1, padding: 10, display: "flex", flexDirection: "column" }}>
        <div style={{ flexGrow: 1, overflowY: "auto", padding: 10, backgroundColor: "#f1f1f1" }}>
          {selectedAthlete ? (
            <>
              <h4>Chatting with {selectedAthlete.name}</h4>
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: msg.from.id === coachUser.id ? "right" : "left",
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      padding: "10px",
                      borderRadius: 10,
                      backgroundColor: msg.from.id === coachUser.id ? "#cce5ff" : "#d9fdd3",
                    }}
                  >
                    <strong>{msg.from.id === coachUser.id ? "You" : msg.from.name}:</strong>{" "}
                    {msg.message}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          ) : (
            <p>Select an athlete to start chatting.</p>
          )}
        </div>

        {/* Input */}
        <div style={{ display: "flex", marginTop: 10 }}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            style={{ flexGrow: 1, padding: 10 }}
          />
          <button onClick={sendMessage} style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "#fff" }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoachChatBox;
