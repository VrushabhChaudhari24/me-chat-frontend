import SidebarHeader from "./SidebarHeader";
import ChatList from "./ChatList";
import ReceivedRequestsPage from "../../pages/ReceivedRequestsPage";
import SentRequestsPage from "../../pages/SentRequestsPage";
import UserSearch from "../search/UserSearch";
import CollapsibleSection from "../common/CollapsibleSection";
import useGetRequests from "../../hooks/useGetConnections";

const Sidebar = ({ chats, currentUserId, onSelectChat }) => {
  const { getRequests, refetchSentRequests } = useGetRequests();

  return (
    <div className="w-full md:w-[360px] h-full md:h-screen flex flex-col border-r border-gray-200 bg-white">
      {/* TOP: Side menu (fixed) */}
      <SidebarHeader />

      {/* Search Users */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <UserSearch />
      </div>

      {/* Send Requests */}
      {getRequests?.sentRequests?.length > 0 && (
        <CollapsibleSection
          title="Sent Requests"
          count={getRequests?.sentRequests?.length}
          defaultOpen={false}
        >
          <SentRequestsPage
            sentRequests={getRequests?.sentRequests}
            refetchSentRequests={refetchSentRequests}
          />
        </CollapsibleSection>
      )}

      {/* Send Requests */}
      {getRequests?.receivedRequests?.length > 0 && (
        <CollapsibleSection
          title="Connection Requests"
          count={getRequests?.receivedRequests?.length}
          defaultOpen={true}
        >
          <ReceivedRequestsPage
            receivedRequests={getRequests?.receivedRequests}
            refetchReceivedRequests={refetchSentRequests}
          />
        </CollapsibleSection>
      )}

      {/* BOTTOM: Chat list (scrollable) */}
      <div className="flex-1 overflow-y-auto">
        {/* {activeTab === "chats" && ( */}
        <ChatList
          chats={chats}
          currentUserId={currentUserId}
          onSelectChat={onSelectChat}
        />
        {/* )} */}
      </div>
    </div>
  );
};

export default Sidebar;
