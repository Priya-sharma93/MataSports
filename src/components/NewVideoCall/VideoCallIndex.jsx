
import React, { useState } from 'react';
import CoachLobby from './CoachLobby';
import AthleteLobby from './AthleteLobby';
import VideoCall from './VideoCall';

const VideoCallIndex = () => {
    const [inCall, setInCall] = useState(false);
    const [userDetails, setUserDetails] = useState({
        userId: 'coach_1',
        role: 'coach',
    });
    const [callDetails, setCallDetails] = useState(null);

    const handleStartCall = (details) => {
        setCallDetails(details);
        setInCall(true);
    };

    return (
        <div>
            {inCall ? (
                <VideoCall
                    userDetails={userDetails}
                    remoteUserId={callDetails.remoteUserId}
                    roomId={callDetails.room}
                />
            ) : userDetails.role === 'coach' ? (
                <CoachLobby onStartCall={handleStartCall} userDetails={userDetails} />
            ) : (
                <AthleteLobby onStartCall={handleStartCall} userDetails={userDetails} />
            )}
        </div>
    );
};

export default VideoCallIndex;
