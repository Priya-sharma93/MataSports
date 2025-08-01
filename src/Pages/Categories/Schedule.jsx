// import React, { useState } from "react";
// import axios from "axios"; 
// import Cookies from "js-cookie"; 
// import { useNavigate } from "react-router-dom"; 

// const ScheduleMeeting = () => {
//   const [coachId, setCoachId] = useState("");
//   const [meetingDate, setMeetingDate] = useState("");
//   const navigate = useNavigate();

//   const handleSchedule = async () => {
//     if (!coachId || !meetingDate) {
//       alert("Please enter both Coach ID and Meeting Date!");
//       return;
//     }

//     try {
//   const token = Cookies.get("auth_token");
//   if (!token) throw new Error("Authentication token missing.");

//   const scheduleData = { coach_id: coachId, start_time: meetingDate };
  
//   console.log("Sending request:", scheduleData);

//   const response = await axios.post("https://sports-backend-s5za.onrender.com/meetings", scheduleData, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   alert("Meeting scheduled successfully!");
//   console.log("Response:", response.data);

//   navigate(`/coachsection/${coachId}`, { state: { coachId } });

// } catch (error) {
//   console.error("Network Error:", error.message, error.response?.data);
//   alert(`Failed to schedule meeting: ${error.message}`);
// }

//   };

//   return (
//     <div>
//       <h2>Schedule a Meeting</h2>
//       <input
//         type="number"
//         placeholder="Enter Coach ID"
//         value={coachId}
//         onChange={(e) => setCoachId(e.target.value)}
//       />
//       <input
//         type="datetime-local"
//         value={meetingDate}
//         onChange={(e) => setMeetingDate(e.target.value)}
//       />
//       <button onClick={handleSchedule}>Schedule Meeting</button>
//     </div>
//   );
// };

// export default ScheduleMeeting;
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ScheduleMeeting = () => {
  const [meetingDate, setMeetingDate] = useState("");

  const handleSchedule = () => {
    if (meetingDate) {
      alert(`Meeting scheduled for ${meetingDate}`);
    } else {
      alert("Please select a date and time!");
    }

  };

  return (
    <div style={{ 
      display: "flex", 
      gap: "30px", 
      alignItems: "center", 
      justifyContent: "center", 
      background: "#f5f5f5", 
      padding: "40px", 
      borderRadius: "10px", 
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
    }}>

      <div style={{ 
        padding: "20px", 
        borderRadius: "10px", 
        background: "#fff", 
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <h2 style={{ color: "#333", fontSize: "22px", fontWeight: "700", marginBottom: "15px" }}>
          Schedule Meeting
        </h2>
        <label style={{ fontSize: "16px", fontWeight: "600", color: "#333" }}>Select Date & Time:</label>
        <input
          type="datetime-local"
          value={meetingDate}
          onChange={(e) => setMeetingDate(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginTop: "10px",
            cursor: "pointer",
            display: "block",
            width: "100%"
          }}
        />
        <button
          onClick={handleSchedule}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "600",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "0.3s"
          }}
          onMouseOver={(e) => (e.target.style.background = "#0056b3")}
          onMouseOut={(e) => (e.target.style.background = "#007bff")}
        >
          Schedule Meeting
        </button>
      </div>

      <div style={{ 
        padding: "20px", 
        borderRadius: "10px", 
        background: "#fff", 
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <DatePicker inline />
      </div>
    </div>
  );
};

export default ScheduleMeeting;
