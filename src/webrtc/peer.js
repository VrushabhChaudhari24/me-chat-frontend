export const createPeer = (onIce, onRemoteStream) => {
  const pc = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });

  const remoteStream = new MediaStream();

  pc.ontrack = (e) => {
    e.streams[0].getTracks().forEach((t) => {
      if (!remoteStream.getTracks().includes(t)) {
        remoteStream.addTrack(t);
      }
    });
    onRemoteStream(remoteStream);
  };

  pc.onicecandidate = (e) => {
    if (e.candidate) onIce(e.candidate);
  };

  return pc;
};
