import { useState } from "react";
function LobbyController ({fetchVideoStream,stopVideoStream,fetchAudioStream,stopAudioStream,camStream,micStream} : any) {
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);

  const handleVideoToggle = () => {
    if (isVideoOn) {
        stopVideoStream();
    } else {
        fetchVideoStream(camStream);
    }
    setIsVideoOn(prev => !prev);
  }

  const handleAudioToggle = () => {
    if (isAudioOn) {
        stopAudioStream();
    } else {
        fetchAudioStream(micStream);
    }
    setIsAudioOn(prev => !prev);
  }

 

 

  return (
    <div className="bottom-0 w-96 rounded-xl left-96 bg-gray-800 p-4 flex justify-center items-center space-x-5">
    <button
      className={`mr-4 ${
        isVideoOn ? "bg-green-500" : "bg-red-500"
      } hover:bg-opacity-80 text-white px-3 py-2 rounded-full transition-colors`}
      disabled={!fetchVideoStream.isCallable && !stopVideoStream.isCallable}
      onClick={handleVideoToggle}
    >
      {isVideoOn ? 'video on' : 'video off'}
    </button>
    <button
      className={`${
        isAudioOn ? "bg-green-500" : "bg-red-500"
      } hover:bg-opacity-80 text-white px-3 py-2 rounded-full transition-colors`}
      disabled={!fetchAudioStream.isCallable && ! stopAudioStream.isCallable}
      onClick={handleAudioToggle}
    >
      {isAudioOn ? 'mic on' : 'mic off'}
    </button>
  </div>
  );
}

export default LobbyController;
