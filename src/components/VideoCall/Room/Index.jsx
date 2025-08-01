import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const RoomPage = () => {
    const roomId = "testRoom123";  // Hardcoded test
    const AppSign = "5d4f809e3d10598fb29b3a5ddf5151338d6070ac917bad29b759be584b45e259";
    const { sportName, coachid = "defaultUser_" + Math.floor(Math.random() * 1000000) } = useParams();
    const userName = "Priya";
    const roomContainer = useRef(null);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const joinRoom = async () => {
            const appID = 1400317468;
            const serverSecret = "91c62480e6caedb540cebf7d5b83f4ee";
            const expiryTimestamp = Date.now() + 3600 * 1000; // Token valid for 1 hour

            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                // AppSign,
                roomId,
                coachid,
                // expiryTimestamp,
                userName
            );

            const zc = ZegoUIKitPrebuilt.create(kitToken);

            zc.joinRoom({
                container: roomContainer.current,
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
                onLeaveRoom: () => { // Redirect user to feedback page on call end
                    navigate("/feedback");
                }
            });
        };

        joinRoom();

        return () => {
            // Cleanup on component unmount
            if (roomContainer.current) {
                roomContainer.current.innerHTML = "";
            }
        };
    }, [roomId, coachid, userName, navigate]);

    return <div ref={roomContainer} style={{ width: "100%", height: "100vh" }}>Loading...</div>;
};

export default RoomPage;
