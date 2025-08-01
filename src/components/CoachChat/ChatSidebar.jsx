import React, { useEffect, useState } from "react";

const ChatSidebar = ({ coachId, socket, onSelectAthlete }) => {
  const [athletes, setAthletes] = useState([]);

  useEffect(() => {
    if (socket && coachId) {
      // Send get_chat_list request when coach logs in
      socket.send(JSON.stringify({
        type: "get_chat_list",
        id: coachId
      }));

      // Handle incoming chat list
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "chat_list") {
          if (data.athletes) {
            setAthletes(data.athletes);
          } else if (data.error) {
            console.error("Error fetching chat list:", data.error);
          }
        }
      };
    }
  }, [socket, coachId]);

  return (
    <div className="chat-sidebar">
      <h3>Your Athletes</h3>
      {athletes.length === 0 ? (
        <p>No athletes found</p>
      ) : (
        <ul>
          {athletes.map((athlete) => (
            <li
              key={athlete.id}
              onClick={() => onSelectAthlete(athlete)}
              style={{ cursor: "pointer", padding: "8px", borderBottom: "1px solid #ccc" }}
            >
              {athlete.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatSidebar;