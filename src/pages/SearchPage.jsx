import UserSearch from "../components/search/UserSearch";

const SearchPage = () => {
  return (
    <div className="min-h-screen bg-light">
      <h2 className="text-xl font-semibold text-center py-4">
        Find Users
      </h2>
      <UserSearch />
    </div>
  );
};

export default SearchPage;
