const IncomingCallModal = ({ callType, onAccept, onReject }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded">
        <p>Incoming {callType} call</p>
        <div className="flex gap-4 mt-4">
          <button onClick={onAccept}>Accept</button>
          <button onClick={onReject}>Reject</button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallModal;
