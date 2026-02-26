import { useEffect, useRef } from "react";

const VideoCall = ({
  localStream,
  remoteStream,
  onEnd,
  onStartVideo,
  isMuted,
  onToggleMute,
}) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  /* Attach local stream */
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  /* Attach remote stream */
  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      {/* 🔹 REMOTE VIDEO (FULL SCREEN) */}
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-cover bg-black"
      />

      {/* 🔹 LOCAL VIDEO (PiP – RESPONSIVE) */}
      <div
        className="
          absolute 
          bottom-24 right-4 
          w-28 h-40 
          sm:w-36 sm:h-52 
          md:w-44 md:h-60
          rounded-xl overflow-hidden 
          bg-black shadow-xl 
          border border-white/20
        "
      >
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* 🔹 CALL CONTROLS (MOBILE-FIRST) */}
      <div
        className="
          absolute bottom-4 left-1/2 -translate-x-1/2
          flex gap-5
          bg-black/70 backdrop-blur
          px-6 py-3
          rounded-full
          safe-area-inset-bottom
        "
      >
        {/* MUTE */}
        <button
          onClick={onToggleMute}
          className={`
            w-12 h-12 sm:w-14 sm:h-14
            rounded-full
            flex items-center justify-center
            text-xl
            ${isMuted ? "bg-yellow-500" : "bg-gray-700"}
          `}
          aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
        >
          {isMuted ? "🎙️" : "🔇"}
        </button>

        {/* START VIDEO */}
        <button
          onClick={onStartVideo}
          className="
            w-12 h-12 sm:w-14 sm:h-14
            rounded-full
            bg-green-600
            flex items-center justify-center
            text-xl
          "
          aria-label="Start video"
        >
          🎥
        </button>

        {/* END CALL */}
        <button
          onClick={onEnd}
          className="
            w-12 h-12 sm:w-14 sm:h-14
            rounded-full
            bg-red-600
            flex items-center justify-center
            text-xl
          "
          aria-label="End call"
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
