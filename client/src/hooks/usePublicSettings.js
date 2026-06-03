import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function usePublicSettings() {
  const [settings, setSettings] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  const refresh = async () => {
    try {
      setError(null);
      const response = await axios.get(`${baseUrl}/auth/setup-state`);
      const payload = response.data || null;
      setSettings(payload);
      return payload;
    } catch (requestError) {
      setError(requestError);
      return null;
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const canRegister = useMemo(() => {
    if (settings && typeof settings.isInitialSetup === "boolean") {
      return settings.isInitialSetup;
    }
    return false;
  }, [settings]);

  return {
    settings,
    loaded,
    error,
    canRegister,
    refresh,
  };
}
