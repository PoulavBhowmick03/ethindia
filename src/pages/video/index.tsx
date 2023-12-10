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
  const mountRef = useRef(false);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleJoinRoom = async () => {
    console.warn({ state });

    if (state !== "idle" || !selectedOption) return;

    const roomId = router.query.roomId?.toString() || "";
    await joinRoom({
      roomId,
      token,
      metadata: {
        selectedOption,
      },
    });
  };

  useEffect(() => {
    if (!mountRef.current) handleJoinRoom();

    mountRef.current = true;
  }, [selectedOption]);

  const handleLeaveRoom = async () => {
    console.log("room left");
    await leaveRoom();
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    // You can prompt the user to enable video here
    // You can use browser's native API or any library you prefer
  };

  return (
    <main className={Style.background} style={{ height: "100vh" }}>
      <div className="flex justify-center pt-4">
          <div
            className=" bg- rounded-lg shadow-lg p-4 w-96 h-44"
            onClick={() => handleOptionClick("blockchain")}
          >
            <div className="flex">
            <div className="w-24 flex align-middle justify-center mr-16 ml-4 bg-slate-100 rounded-lg mb-4">Blockchain</div>
            <div className="w-24 flex align-middle justify-center mr-16 ml-4 bg-slate-100 rounded-lg mb-4">Blockchain</div> 
            </div>
            <div className="flex pt-4">
            <div className="w-24 flex align-middle justify-center mr-16 ml-4 bg-slate-100 rounded-lg mb-4">Blockchain</div>
            <div className="w-24 flex align-middle justify-center mr-16 ml-4 bg-slate-100 rounded-lg mb-4">Blockchain</div> 
            </div>
           
        </div>
        </div>
      <View />
      <div className="h-40 w-94 flex justify-center align-center">
        
        <button
          style={{
            color: "white",
            padding: 10,
            borderRadius: 15,
            marginTop: 20,
          }}
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
  // ... (no changes here)
};
