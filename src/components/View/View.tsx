import React from "react";
import LocalPeer from "../LocalPeer/LocalPeer";
import RemotePeer from "../RemotePeer/RemotePeer";
import {
  useLocalAudio,
  useLocalVideo,
  usePeerIds,
} from "@huddle01/react/hooks";
import  Style  from "../../components/App.module.css";
type ViewProps = {};

const View: React.FC<ViewProps> = () => {
  const { peerIds } = usePeerIds();
  const { enableVideo, stream, disableVideo } = useLocalVideo();
  const { enableAudio, disableAudio, isAudioOn } = useLocalAudio();

  const handleVideo = async () => {
    await enableVideo().catch((error) => {
      console.log({ error });
    });
  };

  const handleDisableVideo = async () => {
    await disableVideo().catch((error) => {
      console.error({ error });
    });
  };

  const handleAudio = async () => {
    await enableAudio().catch((error) => {
      console.log({ error });
    });
  };

  const handledisableAudio = async () => {
    await disableAudio().catch((error) => {
      console.error({ error });
    });
  };
  return (
    
      <div className="h-96 w-96" >
        <div style={{display:'flex',justifyContent:'center',alignItems:'center', width:"100vw"}}>
        <LocalPeer />
        {peerIds.map((peerId) => (
          <RemotePeer peerId={peerId}  key={`remote-peer-${peerId}`} />
        ))}
      </div>
      <button
      className={Style.btn}
        type="button"
        onClick={() => (stream ? handleDisableVideo() : handleVideo())}
        style={{color:'white',padding:10,borderRadius:15,margin:20}}
      >
        {stream ? "Disable Video" : "Enable Video"}
      </button>
      <button
      className={Style.btn}
        type="button"
        style={{color:'white',padding:10,borderRadius:15,margin:20}}
        onClick={() => (isAudioOn ? handledisableAudio() : handleAudio())}
      >
        {isAudioOn ? "disable Audio" : "enable Audio"}
      </button>
    </div>
  );
};
export default View;
