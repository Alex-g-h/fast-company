import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import UsersLayout from "./layouts/users";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfessionProvider from "./hooks/useProfession";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logout";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./components/store/qualities";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

  return (
    <>
      <AuthProvider>
        <NavBar />
        <ProfessionProvider>
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
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
