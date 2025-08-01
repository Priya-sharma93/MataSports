
import React, { useEffect, useRef, useState } from 'react';
import socket from './Socket';

const VideoCall = ({ userDetails, remoteUserId, roomId }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [localStream, setLocalStream] = useState(null);

  useEffect(() => {
    startLocalVideo();

    socket.on('webrtc_offer', async ({ from, offer }) => {
      if (from !== remoteUserId) return;
      const pc = createPeerConnection(from);
      peerConnection.current = pc;
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit('webrtc_answer', {
        targetUser: from,
        answer,
        room: roomId,
      });
    });

    socket.on('webrtc_answer', async ({ from, answer }) => {
      if (from !== remoteUserId) return;
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on('webrtc_ice_candidate', ({ from, candidate }) => {
      if (from !== remoteUserId || !peerConnection.current) return;
      peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      socket.off('webrtc_offer');
      socket.off('webrtc_answer');
      socket.off('webrtc_ice_candidate');
    };
  }, [remoteUserId, roomId]);

  const startLocalVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
    } catch (err) {
      console.error('Error accessing media devices:', err);
    }
  };

  const createPeerConnection = (targetUserId) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('webrtc_ice_candidate', {
          targetUser: targetUserId,
          candidate: event.candidate,
          room: roomId,
        });
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

    return pc;
  };

  const initiateCall = async () => {
    const pc = createPeerConnection(remoteUserId);
    peerConnection.current = pc;
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit('webrtc_offer', {
      targetUser: remoteUserId,
      offer,
      from: userDetails.userId,
      room: roomId,
    });
  };

  const toggleMic = () => {
    if (!localStream) return;
    localStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
    setMicOn((prev) => !prev);
  };

  const toggleCam = () => {
    if (!localStream) return;
    localStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
    setCamOn((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex space-x-4 mb-4">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="w-1/3 rounded shadow"
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-1/3 rounded shadow"
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={toggleMic}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {micOn ? 'Mute Mic' : 'Unmute Mic'}
        </button>
        <button
          onClick={toggleCam}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {camOn ? 'Turn Off Camera' : 'Turn On Camera'}
        </button>
        <button
          onClick={initiateCall}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Start Call
        </button>
      </div>
    </div>
  );
};

export default VideoCall;