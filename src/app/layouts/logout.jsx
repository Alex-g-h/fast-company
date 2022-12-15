import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const LogOut = () => {
  const { logOut } = useAuth();

  useEffect(() => {
    logOut();
  }, []);

  return <h3>Loading ...</h3>;
};

export default LogOut;
