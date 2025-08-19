import React from "react";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from "react-router-dom";

// Make dynamic according to yourself
const appID = 1971887269;
const serverSecret = "81a9c5dbc288966573eeaa4234de1e51";


const VideoCallPage = () => {
  const { roomID, userID } = useParams();

  const myMeeting = async (element) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userID
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Copy Link',
          url: window.location.origin + `/room/${roomID}/${userID}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  };

  return (
    <div>
      <h3 className="text-center" style={{ marginTop: '10px' }}>Room: {roomID} | User: {userID}</h3>
      <div ref={myMeeting} style={{ width: '100%', height: '90vh' }} />
    </div>
  );
};

export default VideoCallPage;
