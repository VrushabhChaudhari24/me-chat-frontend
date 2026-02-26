import { useEffect, useState, useCallback } from "react";
import api from "../services/api";

const useReceivedRequests = () => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReceivedRequests = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/connections/received");
      setReceivedRequests(res.data);
    } catch (error) {
      console.error("Failed to fetch received requests",error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReceivedRequests();
  }, [fetchReceivedRequests]);

  return {
    receivedRequests,
    loading,
    refetchReceivedRequests: fetchReceivedRequests,
  };
};

export default useReceivedRequests;
