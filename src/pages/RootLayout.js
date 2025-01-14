import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import { getExpirationDuration } from "../utils/getExpirationDuration";

export const RootLayout = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("login");
      return;
    }

    if (token === "EXPIRED") {
      navigate("login");
      return;
    }

    const tokenDuration = getExpirationDuration();
    if (!tokenDuration || tokenDuration <= 0) {
      navigate("login");
      return;
    }

    const timeoutId = setTimeout(() => {
      navigate("login");
    }, tokenDuration);

    return () => clearTimeout(timeoutId);
  }, [navigate, token]);
  return <Outlet />;
};
