import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import useChatList from "../hooks/useChatList";
import ChatHeader from "../components/chat/ChatHeader";
import useCall from "../hooks/useCall";
import useFollow from "../hooks/useFollow";
import useChat from "../hooks/useChat";
import { markChatAsRead } from "../services/chat.service";
import socket from "../socket/socket";
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";
import TypingIndicator from "../components/chat/TypingIndicator";
import useChatSocket from "../hooks/useChatSocket";
import IncomingCallModal from "../components/call/IncomingCallModal";
import AudioCall from "../components/call/AudioCall";
import VideoCall from "../components/call/VideoCall";
import RemoteAudio from "../components/call/RemoteAudio";

const ChatPage = () => {
  const { chats, addChat } = useChatList();
  // const { connections } = useMutualConnections();
  const call = useCall();
  const [selectedChat, setSelectedChat] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const userData = JSON.parse(localStorage.getItem("user_data"));

  const targetUserId = selectedChat
    ? selectedChat.participants.find((p) => p._id !== userData._id)?._id
    : null;

  const formatDuration = (start) => {
    console.log("Formatting duration from start time:", start);
    if (!start) return "00:00";
    const diff = Math.floor((Date.now() - start) / 1000);
    const m = String(Math.floor(diff / 60)).padStart(2, "0");
    const s = String(diff % 60).padStart(2, "0");
    return `${m}:${s}`;
  };
 
  const follow = useFollow(targetUserId);
  console.log("selectedChat?._id,", selectedChat?._id);
   console.log("Selected targetUserId:", targetUserId);

  const { messages, sendMessage, startTyping, typingUser } = useChat(
    selectedChat?._id,
    targetUserId
  );

  console.log("Selected messages:", messages);
  console.log("Selected selectedChat:", selectedChat);
  useEffect(() => {
    if (!selectedChat) return;

    markChatAsRead(selectedChat._id);

    socket.emit("mark-read", {
      chatId: selectedChat._id,
    });
  }, [selectedChat]);

  // 🔥 Auto-open chat on accept
  useChatSocket({
    onChatCreated: ({ chatId }) => {
      const chat = chats.find((c) => c._id === chatId);
      if (chat) {
        setSelectedChat(chat);
      } else {
        addChat(chatId);
      }
    },
  });

  return (
    <div className="flex h-full">
      {/* LEFT SIDEBAR */}
      <div className={`${showChat ? "hidden" : "block"} md:block`}>
        <Sidebar
          chats={chats}
          // connections={connections}
          currentUserId={
            localStorage.getItem("user_data")
              ? JSON.parse(localStorage.getItem("user_data"))._id
              : null
          }
          onSelectChat={setSelectedChat}
        />
      </div>
      {/* RIGHT CHAT AREA */}
      <div className={`${showChat ? "flex" : "hidden"} md:flex flex-1 flex-col bg-[#efeae2]`}>
        {!selectedChat ? (
          <div className="flex flex-1 items-center justify-center text-gray-500">
            Hello {localStorage.getItem("name")} Select a chat to start
            messaging
          </div>
        ) : (
          <>
            {/* 🔹 HEADER (STICKY) */}
            <div className="sticky top-0 z-10 bg-white border-b">
              <ChatHeader
                isFollowing={follow.isFollowing}
                isMutual={follow.isMutual}
                onFollow={follow.follow}
                onUnfollow={follow.unfollow}
                onCall={(type) => call.startCall(targetUserId, type)}
                onBack={() => setShowChat(false)}
                connections={selectedChat.participants.filter(
                  (p) => p._id !== userData._id
                )}
              />
            </div>

            {/* 🔹 MESSAGES (SCROLLABLE) */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <MessageList
                messages={messages}
                currentUserId={
                  localStorage.getItem("user_data")
                    ? JSON.parse(localStorage.getItem("user_data"))._id
                    : null
                }
              />

              <TypingIndicator isTyping={typingUser} />
            </div>

            {/* 🔹 INPUT (STICKY BOTTOM) */}
            {/* {follow.isMutual && ( */}
            <div className="sticky bottom-0 bg-white border-t px-4 py-3">
              <MessageInput onSend={sendMessage} onTyping={startTyping} />
            </div>
            {/* )} */}

            {call.incomingCall && (
              <IncomingCallModal
                callerId={call.incomingCall.callerId}
                callType={call.incomingCall.callType}
                onAccept={() => call.acceptCall(call.incomingCall.callerId)}
                onReject={() => call.rejectCall(call.incomingCall.callerId)}
              />
            )}

            {call.inCall && call.remoteStream && (
              <RemoteAudio stream={call.remoteStream} />
            )}

            {call.inCall && (
              <div className="absolute top-4 left-4 text-white">
                {formatDuration(call.callStartTime)}
              </div>
            )}

            {call.inCall && call.callType === "audio" && (
              <AudioCall
                onEnd={call.endCall}
                isMuted={call.isMuted}
                onToggleMute={call.toggleMute}
              />
            )}

            {call.inCall && call.callType === "video" && (
              <VideoCall
                remoteStream={call.remoteStream}
                localStream={call.localStream}
                onEnd={call.endCall}
                isMuted={call.isMuted}
                onToggleMute={call.toggleMute}
                onStartVideo={call.startVideo}
              />
            )}

            {call.error && (
              <div
                className="fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded"
                style={{ zIndex: 999, top: "57px" }}
              >
                {call.error}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
