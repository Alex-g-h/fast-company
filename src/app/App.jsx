import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import UsersLayout from "./layouts/users";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfessionProvider from "./hooks/useProfession";
import QualityProvider from "./hooks/useQuality";

function App() {
  return (
    <>
      <NavBar />
      <ProfessionProvider>
        <QualityProvider>
          <Switch>
            <Route path="/" exact component={Main}></Route>
            <Route path="/login/:type?" component={Login}></Route>
            <Route
              path="/users/:userId?/:edit?"
              component={UsersLayout}
            ></Route>
            <Redirect to="/" />
          </Switch>
        </QualityProvider>
      </ProfessionProvider>
      <ToastContainer />
    </>
  );
}

export default App;
