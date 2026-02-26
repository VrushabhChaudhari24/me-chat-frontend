import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import useUserSearch from "../../hooks/useUserSearch";
import { isValidSearchQuery } from "../../utils/validators";
import { sendConnectionRequest } from "../../services/connection.service";
import { debounce } from "../../utils/debounce";

const UserSearch = () => {
  const [query, setQuery] = useState("");
  const { results, search, clearResults } = useUserSearch();

  // 🔹 Debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce(async (value) => {
        if (!isValidSearchQuery(value)) {
          clearResults();
          return;
        }

        try {
          await search(value);
        } catch {
          toast.error("Search failed");
        }
      }, 400),
    [search, clearResults]
  );

  // 🔹 Trigger search on typing
  useEffect(() => {
    if (!query.trim()) {
      clearResults();
      return;
    }
    console.log("Searching for:", query);
    debouncedSearch(query);

    return () => {
      debouncedSearch.cancel?.();
    };
  }, [query, debouncedSearch, clearResults]);

   return (
    <div>
      <div className="flex gap-2">
        <input
          className="flex-1 px-3 py-2 border rounded-md text-sm"
          placeholder="Search users by name or number"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="mt-3 space-y-2">
        {results.map((user) => (
          <div
            key={user._id}
            className="flex justify-between items-center text-sm border p-2 rounded"
          >
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-gray-500">{user.mobile}</p>
            </div>

            <button
              onClick={() => sendConnectionRequest(user._id)}
              className="text-secondary font-medium"
            >
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;
