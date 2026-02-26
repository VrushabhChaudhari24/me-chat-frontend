import { useCallback, useState } from "react";
import { searchUsers } from "../services/user.service";

const useUserSearch = () => {
  const [results, setResults] = useState([]);

  const search = useCallback(async (query) => {
    const data = await searchUsers(query);
    setResults(data);
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
  }, []);

  return { results, search, clearResults };
};

export default useUserSearch;
