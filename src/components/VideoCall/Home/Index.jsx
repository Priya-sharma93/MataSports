import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () =>  {
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    // Dummy values for sportName & coachid (Modify as needed)
    const sportName = "badminton";  // Replace with dynamic input if available
    const coachid = "coach123"; // Replace with actual ID if available

    const handleJoinRoom = useCallback(() => {
        if (value.trim()) {
            navigate(`/room/${value}/${sportName}/${coachid}`);
        } else {
            alert("Please enter a valid code.");
        }
    }, [navigate, value]);

    return (
        <div> 
            <input 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                type="text"  
                placeholder="Enter the code"
            />
            <button onClick={handleJoinRoom}>Join</button> 
        </div>
    );
};

export default HomePage;
