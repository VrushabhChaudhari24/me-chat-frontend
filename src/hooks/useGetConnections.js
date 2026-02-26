import { useEffect, useState, useCallback } from "react";
import api from "../services/api";

const useGetRequests = () => {
  const [getRequests, setGetRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGetRequests = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/connections/connection");
      setGetRequests(res.data);
    } catch (error) {
      console.error("Failed to fetch requests",error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGetRequests();
  }, [fetchGetRequests]);

  return {
    getRequests,
    loading,
    refetchSentRequests: fetchGetRequests,
  };
};

export default useGetRequests;
