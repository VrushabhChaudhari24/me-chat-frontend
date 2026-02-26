const AudioCall = ({ onEnd, isMuted, onToggleMute }) => {
  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-50">
      <p className="text-lg mb-6">Audio Call</p>

      <div className="flex gap-6">
        <button
          onClick={onToggleMute}
          className={`px-5 py-3 rounded-full ${
            isMuted ? "bg-yellow-500" : "bg-gray-700"
          }`}
        >
          {isMuted ? "Unmute 🎙️" : "Mute 🔇"}
        </button>

        <button
          onClick={onEnd}
          className="px-5 py-3 bg-red-600 rounded-full"
        >
          End
        </button>
      </div>
    </div>
  );
};

export default AudioCall;
