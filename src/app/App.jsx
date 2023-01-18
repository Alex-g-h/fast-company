import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import UsersLayout from "./layouts/users";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logout";
import AppLoader from "./components/ui/hoc/appLoader";

function App() {
  return (
    <>
      <AppLoader>
        <AuthProvider>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/logout" component={LogOut} />
            <ProtectedRoute
              path="/users/:userId?/:edit?"
              component={UsersLayout}
            />
            <Redirect to="/" />
          </Switch>
        </AuthProvider>
      </AppLoader>
      <ToastContainer />
    </>
  );
}

export default App;
