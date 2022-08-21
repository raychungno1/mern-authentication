import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IAuthStore } from "../interfaces/user";

export const useGetAuth = () => {
  const location = useLocation();
  const [auth, setAuth] = useState<IAuthStore | null>(
    localStorage.getItem("profile") &&
      JSON.parse(localStorage.getItem("profile") || "{}")
  );

  useEffect(() => {
    setAuth(
      localStorage.getItem("profile") &&
        JSON.parse(localStorage.getItem("profile") || "{}")
    );
  }, [location]);

  return { auth, setAuth };
};
