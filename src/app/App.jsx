import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import UsersLayout from "./layouts/users";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main}></Route>
        <Route path="/login/:type?" component={Login}></Route>
        <Route path="/users/:userId?/:edit?" component={UsersLayout}></Route>
      </Switch>
      <ToastContainer />
    </>
  );
}

export default App;
