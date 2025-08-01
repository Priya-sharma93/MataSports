import React, { useState } from 'react';
import socket from './Socket';

const CoachLobby = ({ onStartCall, userDetails }) => {
  const [callSent, setCallSent] = useState(false);
  const [roomId, setRoomId] = useState('');

  const callAthlete = () => {
    const room = 'room_' + Date.now();
    socket.emit('initiate_call', {
      to: 'athlete_1',
      from: userDetails.userId || 'coach_1',
      room,
    });
    setRoomId(room);
    setCallSent(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Coach Dashboard</h2>
      {!callSent ? (
        <button
          onClick={callAthlete}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Call Athlete
        </button>
      ) : (
        <div className="text-center">
          <p className="mb-4">Call sent to Athlete. Waiting for them to join...</p>
          <button
            onClick={() => onStartCall({ room: roomId, remoteUserId: 'athlete_1' })}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Join Now
          </button>
        </div>
      )}
    </div>
  );
};

export default CoachLobby;