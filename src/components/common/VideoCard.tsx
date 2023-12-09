import React, { useEffect, useRef } from "react";

interface Props {
  stream?: MediaStream;
  className?: string;
  isMe?: boolean;
  objectCover?: boolean;
}

const VideoCard: React.FC<Props> = ({ stream, isMe }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const dependencies = isMe ? [stream] : [];

  useEffect(() => {
    const videoObj = videoRef.current;

    if (videoObj && stream) {
      videoObj.srcObject = stream;

      videoObj.onloadedmetadata = async () => {
        try {
          await videoObj.play();
        } catch (error) {
          console.error(error);
        }
      };

      videoObj.onerror = () => {
        console.error("videoCard() | Error is hapenning...");
      };
    }
  }, dependencies);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      className="animate-opacity-show  h-full aspect-video w-full rounded-lg shadow-md"
      style={{borderRadius:0}}
    />
  );
};

export default React.memo(VideoCard);
