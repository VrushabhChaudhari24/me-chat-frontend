
import {
  followUser,
  unfollowUser,
} from "../services/follow.service";

const useFollow = (targetUserId) => {
  // const [status, setStatus] = useState({
  //   isFollowing: false,
  //   isFollower: false,
  //   isMutual: false,
  // });

  // const loadStatus = async () => {
  //   const data = await getFollowStatus(targetUserId);
  //   setStatus(data);
  // };

  const follow = async () => {
    await followUser(targetUserId);
    // loadStatus();
  };

  const unfollow = async () => {
    await unfollowUser(targetUserId);
    // loadStatus();
  };

  // useEffect(() => {
  //   loadStatus();
  // }, [targetUserId]);

  return {
    follow,
    unfollow,
  };
};

export default useFollow;
