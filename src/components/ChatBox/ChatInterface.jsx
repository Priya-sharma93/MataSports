import React, { useState } from "react";
import useChatContext from "./hooks/useChatContext";
import ChatBox from "./ChatBox";
import ChatSidebar from "../CoachChat/ChatSidebar";


const ChatInterface = () => {
  const {
    setUserType,
    setUsername,
    connectWebSocket,
    isConnected,
    userType,
    username,
  } = useChatContext();

  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setUserType(role);
  };

  const handleConnect = () => {
    if (selectedRole && username) {
      connectWebSocket();
    }
  };

  return (
    <div className="chat-interface">
      {!isConnected ? (
        <div className="setup-section">
          <h2>Select Your Role</h2>
          <button onClick={() => handleRoleSelect("athlete")}>Athlete</button>
          <button onClick={() => handleRoleSelect("coach")}>Coach</button>

          {selectedRole && (
            <>
              <input
                type="text"
                placeholder={`Enter ${selectedRole} username`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button onClick={handleConnect}>Connect</button>
            </>
          )}
        </div>
      ) : (
        <ChatBox/>
        
      )}
    </div>
  );
};

export default ChatInterface;
