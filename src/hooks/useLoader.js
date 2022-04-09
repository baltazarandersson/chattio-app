import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

export function useLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, roomMessages, currentParticipants } = useUserContext();

  useEffect(() => {
    if (
      user &&
      currentParticipants.length > 0 &&
      Object.keys(roomMessages).length !== 0
    ) {
      setIsLoading(false);
    }
  }, [currentParticipants, roomMessages, user]);

  return isLoading;
}
