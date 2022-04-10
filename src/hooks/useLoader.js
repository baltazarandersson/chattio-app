import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

export function useLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, currentParticipants, currentRoomData } = useUserContext();

  useEffect(() => {
    if (
      (user && currentParticipants.length > 0,
      Object.keys(currentRoomData).length !== 0)
    ) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [currentParticipants, user, currentRoomData]);

  return isLoading;
}
