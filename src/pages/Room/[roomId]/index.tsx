import View from "@/components/View/View";
import { useRoom } from "@huddle01/react/hooks";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import Style  from "../../../components/App.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";

type Props = {
  token: string;
};

export default function Room({ token }: Props) {
  const { joinRoom, state } = useRoom();
 const router=useRouter()
  const handleJoinRoom = async () => {
    const roomId=router.query.roomId?.toString() || ""
    await joinRoom({
      roomId:'fge-bxdp-hwr',
      token,
    });
  };
  useEffect(() => {
   handleJoinRoom()
  }, [])

  return (
    <main className={Style.background} style={{height:"100vh"}}>
      <View />
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
        // you can add any custom attributes here which you want to associate with the user
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
