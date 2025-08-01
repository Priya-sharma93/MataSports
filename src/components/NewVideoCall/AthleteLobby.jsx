
import React, { useEffect, useState } from 'react';
import socket from './Socket';
import IncomingCallModal from './IncomingCallModal';

const AthleteLobby = ({ onStartCall, userDetails }) => {
  const [callInfo, setCallInfo] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [acceptedRoom, setAcceptedRoom] = useState('');

  useEffect(() => {
    socket.on('call_received', (data) => {
      setCallInfo(data);
    });

    return () => socket.off('call_received');
  }, []);

  const handleAccept = () => {
    socket.emit('accept_call', { room: callInfo.room, to: callInfo.from });
    setAcceptedRoom(callInfo.room);
    setCallAccepted(true);
    setCallInfo(null);
  };

  const handleReject = () => {
    socket.emit('reject_call', { room: callInfo.room, to: callInfo.from });
    setCallInfo(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Athlete Dashboard</h2>
      {callInfo && !callAccepted && (
        <IncomingCallModal
          caller={callInfo.from}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}
      {callAccepted && (
        <div className="text-center">
          <p className="mb-4">Call accepted. Join the video call now.</p>
          <button
            onClick={() => onStartCall({ room: acceptedRoom, remoteUserId: callInfo.from })}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Join Now
          </button>
        </div>
      )}
    </div>
  );
};

export default AthleteLobby;
