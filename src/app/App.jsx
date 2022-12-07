import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import UsersLayout from "./layouts/users";
import { ToastContainer } from "react-toastify";
import ProfessionProvider from "./hooks/useProfession";

function App() {
  return (
    <>
      <NavBar />
      <ProfessionProvider>
        <Switch>
          <Route path="/" exact component={Main}></Route>
          <Route path="/login/:type?" component={Login}></Route>
          <Route path="/users/:userId?/:edit?" component={UsersLayout}></Route>
        </Switch>
      </ProfessionProvider>
      <ToastContainer />
    </>
  );
}

export default App;
