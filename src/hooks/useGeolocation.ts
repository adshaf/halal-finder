import { useState, useCallback } from "react";

type Position = { lat: number; lng: number };

export function useGeolocation() {
  const [position, setPosition] = useState<Position | null>(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(() => {
    if (!navigator.geolocation) return;
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosition({ lat: coords.latitude, lng: coords.longitude });
        setLoading(false);
      },
      () => {
        // Permission denied or unavailable — fall back to default (handled by caller)
        setLoading(false);
      },
      { timeout: 8000 },
    );
  }, []);

  return { position, loading, request };
}
