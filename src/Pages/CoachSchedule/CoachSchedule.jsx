import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaPhone, FaPhoneSlash, FaCommentDots } from 'react-icons/fa';

import './CoachSchedule.css';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

function CoachSchedule() {
  const [date, setDate] = useState(new Date());
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [pendingMeetings, setPendingMeetings] = useState([]);
  const navigate = useNavigate();
  const location = useLocation()
  const coachId = location.state.coachId || {}


  useEffect(() => {
    fetchMeetings(coachId);
  }, [coachId]);


  // ✅ Fetch accepted meetings for the coach
  const fetchMeetings = async (coachId) => {
    try {
      // const response = await fetch(`https://sports-backend-x6w5.onrender.com/coaches/${coachId}/meetings`);
      const response = await fetch(`http://127.0.0.1:5004/coaches/${coachId}/meetings`);
      // const response = await fetch(`http://127.0.0.1:5004/coaches/7/meetings`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setMeetings(data);

      // Identify pending meetings (those not accepted or declined)
      setPendingMeetings(data.filter(m => m.status !== 'accepted'));
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  // ✅ Accept a meeting
  const handleAcceptUpdate = async (meetingId) => {
    try {
      // const response = await fetch(`https://sports-backend-x6w5.onrender.com/meetings/status`, {
      const response = await fetch(`http://127.0.0.1:5004/meetings/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meeting_id: meetingId, status: 'accepted' }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'Error accepting meeting');
        return;
      }

      const updatedMeeting = await response.json();
      console.log('Accepted:', updatedMeeting);

      // Update meetings and pending
      setMeetings(prev => [...prev.filter(m => m.id !== meetingId), updatedMeeting]);
      setPendingMeetings(prev => prev.filter(m => m.id !== meetingId));
    } catch (error) {
      console.error('Error accepting the meeting:', error);
    }
  };

  // ✅ Decline a meeting (status = "declined" → deletes it)
  const handleDeclineCall = async (meetingId) => {
    if (!meetingId) return;
    try {
      // const response = await fetch(`https://sports-backend-x6w5.onrender.com/meetings/status`, {
      const response = await fetch(`http://127.0.0.1:5004/meetings/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meeting_id: meetingId, status: 'declined' }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      console.log('Declined:', data);

      // Remove declined meeting from state
      setMeetings(prev => prev.filter(m => m.id !== meetingId));
      setPendingMeetings(prev => prev.filter(m => m.id !== meetingId));
    } catch (error) {
      console.error('Error rejecting the meeting:', error);
    }
  };

  const generateRoomId = () => Math.random().toString(36).substring(2, 8);
  const startVideoCall = () => {
    const roomId = generateRoomId();
    navigate(`/room/${roomId}`);
  };

  return (
    <Container fluid style={{ padding: '20px' }}>
      <Row className="d-flex justify-content-center align-items-center">
        {/* Left Section: Notifications */}
        <Col xs={4}>
          <Card className="notification-card">
            <h2>Notifications</h2>
            <div className="notification-box">
              {pendingMeetings.length > 0 ? (
                pendingMeetings.map((meeting, index) => (
                  <div key={meeting.id || index} className="meeting-notification">
                    <p><strong>{meeting?.athlete?.name || "No Athlete Name"}</strong></p>
                    <p>Coach: {meeting?.coach?.name || "No Coach Name"}</p>
                    <p>Start Time: {meeting?.start_time || "No Start Time"}</p>
                    <p>Status: {meeting?.status || "Unknown Status"}</p>
                    <Button className="accept-btn btn-sm" onClick={() => handleAcceptUpdate(meeting.id)}>✔</Button>
                    <Button className="reject-btn btn-sm" onClick={() => handleDeclineCall(meeting.id)}>✖</Button>
                  </div>
                ))
              ) : <p>No pending meetings available</p>}
            </div>
          </Card>
        </Col>

        {/* Center Section: Calendar */}
        <Col xs={4}>
          <div className="calendar-container">
            <Calendar onChange={setDate} value={date} />
          </div>
        </Col>

        {/* Right Section: Accepted Meetings */}
        <Col xs={4}>
          <Card className="accepted-notifications-card">
            <h2>Accepted Notifications</h2>
            <div className="accepted-box">
              {meetings?.filter(m => m.status === "accepted").length > 0 ? (
                meetings.filter(m => m.status === "accepted").map((meeting, index) => (
                  <div key={meeting.id || index} className="meeting-notification">
                    <p><strong>{meeting?.athlete?.name || "No Athlete Name"}</strong></p>
                    <p>Coach: {meeting?.coach?.name || "No Coach Name"}</p>
                    <p>Start Time: {meeting?.start_time || "No Start Time"}</p>
                    <p>Status: {meeting?.status || "Unknown Status"}</p>
                  </div>
                ))
              ) : <p>No accepted meetings</p>}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Floating Video Call & Chat Buttons */}
      <div className="floating-call-icons">
        <button className="call-button accept" onClick={startVideoCall}>
          <FaPhone />
        </button>
        <button className="call-button reject" onClick={() => handleDeclineCall(null)}>
          <FaPhoneSlash />
        </button>
        <button className="call-button chat" onClick={() => navigate('/CoachChat')}>
          <FaCommentDots />
        </button>
      </div>


      {/* Video Call Placeholder */}
      {showVideoCall && <div>Video Call UI</div>}
    </Container>
  );
}

export default CoachSchedule;

