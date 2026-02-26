import { useEffect, useState, useCallback } from "react";
import api from "../services/api";

const useMutualConnections = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchConnections = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/connections/mutual");
      setConnections(res.data);
    } catch (error) {
      console.error("Failed to fetch mutual connections",error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  return {
    connections,
    loading,
    refetchConnections: fetchConnections,
  };
};

export default useMutualConnections;
