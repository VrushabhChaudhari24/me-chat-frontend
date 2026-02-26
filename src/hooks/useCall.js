import { useEffect, useRef, useState } from "react";
import socket from "../socket/socket";
import * as callSocket from "../socket/call.socket";

const useCall = () => {
  const peerRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const peerUserIdRef = useRef(null);

  const [incomingCall, setIncomingCall] = useState(null);
  const [inCall, setInCall] = useState(false);
  const [callType, setCallType] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState(null);

  const getMedia = async ({ audio, video }) => {
    try {
      return await navigator.mediaDevices.getUserMedia({
        audio,
        video,
      });
    } catch (err) {
      console.error("Media permission error:", err);
      throw err;
    }
  };

  /* ---------------- MEDIA + PEER SETUP ---------------- */

  const ensureMediaAndPeer = async (type) => {
    try {
      // 1️⃣ Acquire media ONLY if not exists
      if (!localStreamRef.current) {
        if (type === "audio") {
          // 🎙️ Audio call → mic only
          localStreamRef.current = await getMedia({
            audio: true,
            video: false,
          });
        } else {
          // 🎥 Video call → mic + camera
          localStreamRef.current = await getMedia({
            audio: true,
            video: true,
          });
        }
      }

      // 2️⃣ Create peer if needed
      if (!peerRef.current) {
        peerRef.current = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        peerRef.current.ontrack = (e) => {
          if (!remoteStreamRef.current) {
            remoteStreamRef.current = new MediaStream();
          }
          e.streams[0].getTracks().forEach((t) => {
            if (!remoteStreamRef.current.getTracks().includes(t)) {
              remoteStreamRef.current.addTrack(t);
            }
          });
          setRemoteStream(remoteStreamRef.current);
        };

        peerRef.current.onicecandidate = (e) => {
          if (e.candidate) {
            callSocket.sendIceCandidate(peerUserIdRef.current, e.candidate);
          }
        };

        // 3️⃣ Attach tracks
        localStreamRef.current.getTracks().forEach((track) => {
          peerRef.current.addTrack(track, localStreamRef.current);
        });
      }
    } catch (err) {
      console.error("Error in media/peer setup:", err);
      setError(
        err.name === "NotAllowedError"
          ? "Permission denied. Please allow access."
          : "Unable to access media devices"
      );
      throw err;
    }
  };

  /* ---------------- CALL FLOW ---------------- */

  const startCall = async (receiverId, type) => {
    try {
      peerUserIdRef.current = receiverId;
      setCallType(type);

      await ensureMediaAndPeer(type);
      callSocket.callUser(receiverId, type);
    } catch {
      // handled above
    }
  };

  const acceptCall = async (callerId) => {
    try {
      peerUserIdRef.current = callerId;
      await ensureMediaAndPeer(callType);
      callSocket.acceptCall(callerId);
      setIncomingCall(null);
    } catch {
      rejectCall(callerId);
    }
  };

  const rejectCall = (callerId) => {
    callSocket.rejectCall(callerId);
    cleanup();
  };

  const startVideo = async () => {
    try {
      // If no video track yet, request camera ONLY
      if (!localStreamRef.current.getVideoTracks().length) {
        const videoStream = await getMedia({
          audio: false,
          video: true,
        });

        const videoTrack = videoStream.getVideoTracks()[0];
        localStreamRef.current.addTrack(videoTrack);
        peerRef.current.addTrack(videoTrack, localStreamRef.current);
      }

      // Enable video
      localStreamRef.current.getVideoTracks()[0].enabled = true;

      // Renegotiate
      const offer = await peerRef.current.createOffer();
      await peerRef.current.setLocalDescription(offer);
      callSocket.sendOffer(peerUserIdRef.current, offer);
    } catch (err) {
      setError("Camera permission denied",err);
    }
  };

  const toggleMute = () => {
    const audio = localStreamRef.current?.getAudioTracks()[0];
    if (!audio) return;

    audio.enabled = !audio.enabled;
    setIsMuted(!audio.enabled);
  };

  const endCall = () => {
    callSocket.endCall(peerUserIdRef.current);
    cleanup();
  };

  /* ---------------- CLEANUP ---------------- */

  const cleanup = () => {
    peerRef.current?.close();
    peerRef.current = null;

    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    localStreamRef.current = null;
    remoteStreamRef.current = null;

    setRemoteStream(null);
    setIncomingCall(null);
    setInCall(false);
    setCallType(null);
    setIsMuted(false);
  };

  /* ---------------- SOCKET EVENTS ---------------- */

  useEffect(() => {
    socket.on("incoming-call", ({ callerId, callType }) => {
      setIncomingCall({ callerId, callType });
      setCallType(callType);
    });

    socket.on("call-accepted", async () => {
      const offer = await peerRef.current.createOffer();
      await peerRef.current.setLocalDescription(offer);
      callSocket.sendOffer(peerUserIdRef.current, offer);
    });

    socket.on("offer", async ({ senderId, offer }) => {
      peerUserIdRef.current = senderId;
      await ensureMediaAndPeer();

      await peerRef.current.setRemoteDescription(offer);
      const answer = await peerRef.current.createAnswer();
      await peerRef.current.setLocalDescription(answer);

      callSocket.sendAnswer(senderId, answer);
      setInCall(true);
    });

    socket.on("answer", async ({ answer }) => {
      await peerRef.current.setRemoteDescription(answer);
      setInCall(true);
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      if (candidate && peerRef.current) {
        await peerRef.current.addIceCandidate(candidate);
      }
    });

    socket.on("call-rejected", cleanup);
    socket.on("call-ended", cleanup);

    return () => socket.removeAllListeners();
  }, []);

  /* ---------------- PUBLIC API ---------------- */

  return {
    // state
    incomingCall,
    inCall,
    callType,
    remoteStream,
    localStream: localStreamRef.current,
    isMuted,
    error,

    // actions
    startCall,
    acceptCall,
    rejectCall, // ✅ FIXED
    endCall,
    toggleMute,
    startVideo,
  };
};

export default useCall;
