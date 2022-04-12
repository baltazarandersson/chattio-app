import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useRedirect() {
  let navigate = useNavigate();
  useEffect(() => {
    const authToken = localStorage.getItem("Auth Token");
    if (authToken) {
      navigate("/room/home");
    } else {
      navigate("/");
    }
  }, []);
}
