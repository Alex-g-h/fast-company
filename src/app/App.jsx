import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import UsersLayout from "./layouts/users";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Switch>
        <Route path="/" exact component={Main}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/users/:userId?" component={UsersLayout}></Route>
      </Switch>
    </>
  );
}

export default App;
