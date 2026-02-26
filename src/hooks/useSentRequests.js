import { useEffect, useState, useCallback } from "react";
import api from "../services/api";

const useSentRequests = () => {
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSentRequests = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/connections/sent");
      setSentRequests(res.data);
    } catch (error) {
      console.error("Failed to fetch sent requests",error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSentRequests();
  }, [fetchSentRequests]);

  return {
    sentRequests,
    loading,
    refetchSentRequests: fetchSentRequests,
  };
};

export default useSentRequests;
