import View from "@/components/View/View";
import { useRoom } from "@huddle01/react/hooks";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import Style from "../../components/App.module.css";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

type Props = {
  token: string;
};

export default function Room({ token }: Props) {
  const { joinRoom, state, leaveRoom } = useRoom();
  const [input, setInput] = useState("");
  const mountRef = useRef(false);

  const router = useRouter();

  const handleJoinRoom = async () => {
    console.warn({ state });

    if (state !== "idle") return;
    const roomId = router.query.roomId?.toString() || "";
    await joinRoom({
      roomId: "fge-bxdp-hwr",
      token,
    });
  };

  useEffect(() => {
    if (!mountRef.current) handleJoinRoom();

    mountRef.current = true;
  }, []);

  const handleLeaveRoom = async () => {
    console.log("room left");
    await leaveRoom();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async() => {
    try {
      // Check if the camera permission is granted
      const cameraPermission = await navigator.permissions.query({ name: 'camera' });
  
      if (cameraPermission.state === 'granted') {
        // Camera permission is already granted
        console.log('Camera permission granted');
      } else if (cameraPermission.state === 'prompt') {
        // Camera permission is not yet determined, prompt the user to grant it
        await navigator.mediaDevices.getUserMedia({ video: true });
        console.log('Camera permission granted');
      } else {
        // Camera permission is denied or unavailable
        console.log('Camera permission denied or unavailable');
      }
    } catch (error) {
      console.error('Error asking for camera permission:', error);
    }
      console.log("Message sent:", input);
    setInput("");
    
  };

  return (
    <main className={Style.background} style={{ height: "200vh" }}>
      <View />
      <div className="h-40 w-94 flex justify-center align-center">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter your message..."
          style={{ marginRight: "10px" }}
        />
        <button
          style={{ color: "white", padding: 10, borderRadius: 15, marginTop: 20 }}
          className={Style.btn}
          onClick={handleSendMessage}
        >
          Send Message
        </button>
        <button
          style={{ color: "white", padding: 10, borderRadius: 15, marginTop: 20 }}
          className={Style.btn}
          onClick={handleLeaveRoom}
        >
          Leave Room
        </button>
      </div>
    </main>
  );
}

export const getServerSideProps = async () => {
  const accessToken = new AccessToken({
    apiKey: "Lvtt3L8xT6UhlFLjGlyAgXVd7IF2-TzF",
    roomId: "fge-bxdp-hwr",
    role: Role.HOST,
    permissions: {
      admin: true,
      canConsume: true,
      canProduce: true,
      canProduceSources: {
        cam: true,
        mic: true,
        screen: true,
      },
      canRecvData: true,
      canSendData: true,
      canUpdateMetadata: true,
    },
    options: {
      metadata: {
        walletAddress: "harsh",
      },
    },
  });

  const token = await accessToken.toJwt();

  console.log({ token });

  return {
    props: { token },
  };
};
