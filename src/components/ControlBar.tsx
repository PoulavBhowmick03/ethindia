import { useState,useRef, useEffect } from "react";
import videoLogo from '@/assets/video-camera.png'
function ControlBar({produceVideo,produceAudio,stopProducingVideo,stopProducingAudio,micStream,camStream,startRecording,stopRecording,roomId} : any) {
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isRecordingOn, setIsRecordingOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);

  const handleVideoToggle = () => {
    if (isVideoOn) {
      stopProducingVideo();
    } else {
      produceVideo(camStream);
    }
    setIsVideoOn(prev => !prev);
  }

  const handleAudioToggle = () => {
    if (isAudioOn) {
      stopProducingAudio();
    } else {
      produceAudio(micStream);
    }
    setIsAudioOn(prev => !prev);
  }

  const handleRecordToggle = () => {
    if (isRecordingOn) {
      stopRecording();
    } else {
      console.log(`https://${window.location.host}/rec/${roomId}`);
      startRecording(`https://${window.location.host}/rec/${roomId}`);
    }
    setIsRecordingOn(prev => !prev);
  }
 

  return (
      <>
    <div className="fixed bottom-0 w-96 rounded-xl left-96 bg-gray-800 p-4 flex justify-center items-center space-x-5">


    <button
      className={`mr-4 ${
        isVideoOn ? "bg-green-500" : "bg-red-500"
      } hover:bg-opacity-80 text-white px-3 py-2 rounded-full transition-colors`}
      disabled={!produceVideo.isCallable && !stopProducingVideo.isCallable}
      onClick={handleVideoToggle}
    >
      {isVideoOn ? 'video on' : 'video off'}
    </button>
    <button
      className={`${
        isAudioOn ? "bg-green-500" : "bg-red-500"
      } hover:bg-opacity-80 text-white px-3 py-2 rounded-full transition-colors`}
      disabled={!produceAudio.isCallable && !stopProducingAudio.isCallable}
      onClick={handleAudioToggle}
    >
      {isAudioOn ? 'mic on' : 'mic off'}
    </button>
    <button
      className={`${
        isRecordingOn ? "bg-green-500" : "bg-red-500"
      } hover:bg-opacity-80 text-white px-3 py-2 rounded-full transition-colors`}
      disabled={!stopRecording.isCallable && !startRecording.isCallable}
      onClick={handleRecordToggle}
    >
      {isRecordingOn ? 'recording on' : 'recording off'}
    </button>
  </div>
  </>
  );
}

export default ControlBar;