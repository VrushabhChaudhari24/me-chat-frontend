import { useEffect, useRef } from "react";

const RemoteAudio = ({ stream }) => {
  const audioRef = useRef(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !stream) return;

    // 1️⃣ Attach stream only if changed
    if (audio.srcObject !== stream) {
      audio.srcObject = stream;
    }

    // 2️⃣ Play only once
    if (!hasPlayedRef.current) {
      audio
        .play()
        .then(() => {
          hasPlayedRef.current = true;
          console.log("🔊 Remote audio playing");
        })
        .catch((err) => {
          console.warn("Audio play aborted (safe to ignore):", err);
        });
    }
  }, [stream]);

  return <audio ref={audioRef} />;
};

export default RemoteAudio;
