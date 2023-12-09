import { useLocalAudio, useLocalVideo } from "@huddle01/react/hooks";
import React from "react";
import VideoCard from "../common/VideoCard";
import AudioCard from "../common/AudioCard";

type LocalPeerProps = {};

const LocalPeer: React.FC<LocalPeerProps> = () => {
  const { stream } = useLocalVideo();

  return (
    stream && (
      <div >
        <VideoCard stream={stream} />
      </div>
    )
  );
};
export default LocalPeer;
