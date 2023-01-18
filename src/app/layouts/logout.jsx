import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../components/store/users";

const LogOut = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logOut());
  }, []);

  return <h3>Loading ...</h3>;
};

export default LogOut;
