const FollowButton = ({ isFollowing, follow, unfollow }) => {
  return (
    <button onClick={isFollowing ? unfollow : follow}>
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
