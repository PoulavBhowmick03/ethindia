import { useRemoteAudio, useRemoteVideo } from "@huddle01/react/hooks";
import React from "react";
import VideoCard from "../common/VideoCard";
import AudioCard from "../common/AudioCard";

type RemotePeerProps = {
  peerId: string;
};

const RemotePeer: React.FC<RemotePeerProps> = ({ peerId }) => {
  const { state, stream } = useRemoteVideo({ peerId });
  const { state: audioState, stream: audioStream } = useRemoteAudio({ peerId });

  console.warn({ stream });
  return (
    <div>
      {stream && state === "playable" && <VideoCard stream={stream} />}

      {audioState === "playable" && audioStream && (
        <AudioCard stream={audioStream} />
      )}
    </div>
  );
};
export default RemotePeer;
