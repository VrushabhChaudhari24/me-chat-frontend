
import useConnectionSocket from "../hooks/useConnectionSocket";
import useGetRequests from "../hooks/useGetConnections";


const ConnectionProvider = ({ children }) => {
  // const { refetchReceivedRequests } = useReceivedRequests();
  // // const { refetchSentRequests } = useSentRequests();
  // const { refetchConnections } = useMutualConnections();
  const { refetchSentRequests } = useGetRequests();

  useConnectionSocket({
    onNewRequest: refetchSentRequests,
    onAccepted: refetchSentRequests,
    onRejected: refetchSentRequests,
    onMutualAdded: refetchSentRequests,
  });

  return children;
};

export default ConnectionProvider;
