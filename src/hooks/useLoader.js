import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

export function useLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, currentParticipants } = useUserContext();

  useEffect(() => {
    if (user && currentParticipants.length > 0) {
      setIsLoading(false);
    }
  }, [currentParticipants, user]);

  return isLoading;
}
