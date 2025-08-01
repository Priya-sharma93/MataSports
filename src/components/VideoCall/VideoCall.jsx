import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { Button, Row, Col } from "react-bootstrap";
import { FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash, FaShare, FaPhoneSlash } from "react-icons/fa";
import { BsChatText, BsChatDots } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa6";
import "./VideoCall.css";
import AthHeader from "../../Pages/AthPage/AthHeader/AthHeader";

//  const socket = io("http://127.0.0.1:5000");
//const socket = io("https://sports-backend-zhr8.onrender.com/socket.io");

const VideoCall = () => {
  const navigate = useNavigate();
  const { sportName, coachId } = useParams();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStream = useRef(null);
  const peerConnection = useRef(null);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chatVisible, setChatVisible] = useState(false);
  const [isCamEnabled, setIsCamEnabled] = useState(true);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    startCall();
    return () => {
      endCall();
    };
  }, []);

  const startCall = async () => {
     const socket = io("http://127.0.0.1:5000");
    if (!peerConnection.current) createPeerConnection();
    socket.emit("start-call", { room: coachId });
  
    try {
      // Initialize local stream with enhanced audio features
      localStream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 44100 },
      });
  
      localVideoRef.current.srcObject = localStream.current;
  
      // Add tracks to peer connection
      localStream.current.getAudioTracks().forEach(track => {
        peerConnection.current.addTrack(track, localStream.current);
      });
  
      localStream.current.getVideoTracks().forEach(track => {
        peerConnection.current.addTrack(track, localStream.current);
      });
  
      // Create and send the offer
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      socket.emit("offer", { offer, room: coachId });
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };
  
  const createPeerConnection = () => {
    peerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", { candidate: event.candidate, room: coachId });
      }
    };

    peerConnection.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    socket.on("offer", async (data) => {
      if (!peerConnection.current) createPeerConnection();

      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);

      socket.emit("answer", { answer, room: coachId });
    });

    socket.on("answer", async (data) => {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.answer));
    });

    socket.on("ice-candidate", async (data) => {
      try {
        await peerConnection.current.addIceCandidate(data.candidate);
      } catch (err) {
        console.error("Error adding ICE candidate:", err);
      }
    });
  };
  const endCall = () => {
    if (localStream.current) {
      localStream.current.getTracks().forEach(track => track.stop()); // Stop all media tracks
      localStream.current = null; // Reset local stream
    }
  
    if (peerConnection.current) {
      peerConnection.current.close(); // Close WebRTC connection
      peerConnection.current = null; // Reset peer connection
    }
  
    // Notify server that the call has ended
    socket.emit("end-call", { room: coachId });
  
    // Navigate to feedback page
    navigate(`/feedback/${sportName}`, { state: { coachId } });
  };
  
  // const endCall = () => {
  //   if (localStream.current) {
  //     localStream.current.getTracks().forEach((track) => track.stop());
  //   }
  //   if (peerConnection.current) {
  //     peerConnection.current.close();
  //     peerConnection.current = null;
  //   }
  // };

  const toggleMic = async () => {
    if (!localStream.current) {
      try {
        // Request access to the user's microphone
        localStream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (error) {
        console.error("Error accessing microphone:", error);
        return;
      }
    }
    
  
    // Toggle audio track enabled state
    localStream.current.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
      

    });
  
    setIsMicEnabled(prev => !prev);
  
    // Log the current state of the mic
    console.log("Mic enabled:", localStream.current.getAudioTracks().map(track => track.enabled));
    console.log(localStream.current.getAudioTracks().map(track => ({enabled: track.enabled, readyState: track.readyState})));
  };
  

  const toggleCamera = () => {
    if (localStream.current) {
      localStream.current.getVideoTracks().forEach(track => track.enabled = !track.enabled);
      setIsCamEnabled(prev => !prev);
    }
  };

  const toggleChat = () => {
    setChatVisible(prev => !prev);
  };

  const toggleShare = async () => {
    try {
      if (!isSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });
  
        screenStream.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, screenStream);
        });
  
        localVideoRef.current.srcObject = screenStream;
        setIsSharing(true);
      } else {
        // Stop screen sharing and revert to the camera feed
        startCall();
        setIsSharing(false);
      }
    } catch (err) {
      console.error("Error sharing screen:", err);
    }
  };
  

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chat-message", { room: coachId, message });
      setMessages(prevMessages => [...prevMessages, { sender: "You", text: message }]);
      setMessage("");
    }
  };

  return (
    <>
      <AthHeader />
      <div className="video-call-container">
        <div className="top-section d-flex align-items-center p-3">
          <FaAngleRight className="text-white cursor-pointer" onClick={() => navigate(-1)} />
          <Button variant="light" className="btn-video me-2 text-capitalize" onClick={() => navigate(-1)}>
            {sportName}
          </Button>
          <FaAngleRight className="me-2 text-white" />
          <p className="m-0 text-white">Coaching from {sportName}</p>
        </div>

        <div className="videoDiv">
          <video ref={localVideoRef} autoPlay muted className="local-video" />
          <video ref={remoteVideoRef} autoPlay className="remote-video" />
        </div>

        <Row className="controls justify-content-around my-3">
          <Col xs={2} className="text-center">
            <Button variant="dark" className="control-btn" onClick={toggleCamera}>
              {isCamEnabled ? <FaVideo /> : <FaVideoSlash />}
            </Button>
          </Col>
          <Col xs={2} className="text-center">
            <Button variant="dark" className="control-btn" onClick={toggleMic}>
              {isMicEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
            </Button>
          </Col>
          <Col xs={2} className="text-center">
          <Button variant="dark" className="control-btn" onClick={toggleShare}>
          {isSharing ? <FaShare /> : <FaShare />}</Button>
         </Col>
          <Col xs={2} className="text-center">
            <Button variant="secondary" className="control-btn" onClick={toggleChat}>
              {chatVisible ? <BsChatDots /> : <BsChatText />}
            </Button>
          </Col>
          <Col xs={2} className="text-center">
            <Button variant="danger" onClick={endCall} className="control-btn">
              <FaPhoneSlash />
            </Button>
          </Col>
        </Row>

        {chatVisible && (
       <div className="chat-container">
       <div className="chat-header">Live Chat</div>
       <div className="messages">
       {messages.map((msg, index) => (
        <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
       ))}
        </div>
      <input
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Type a message..."
    />
    <button onClick={sendMessage}>Send</button>
  </div>
)}

      </div>
    </>
  );
};

export default VideoCall;
