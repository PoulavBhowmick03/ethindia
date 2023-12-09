import React, { useEffect, useRef } from "react";

type AudioCardProps = {
  stream: MediaStream;
};

const AudioCard: React.FC<AudioCardProps> = ({ stream }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioObj = audioRef.current;
    if (audioObj && stream) {
      audioObj.srcObject = stream;

      audioObj.onloadedmetadata = async () => {
        try {
          audioObj.play();
        } catch (error) {
          console.error({ error });
        }
      };
    }
  }, []);
  return <audio ref={audioRef} autoPlay />;
};
export default AudioCard;
