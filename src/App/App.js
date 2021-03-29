import { CssBaseline } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import ErrorComponent from "../components/common/errors/ErrorComponent";
import AppLoader from "../components/common/uiElements/AppLoader";
import HomePage from "../components/home/HomePage";
import LoginPage from "../components/login/LoginPage";
import AppNavigation from "../components/navigation/AppNavigation";
import RegisterPage from "../components/register/RegisterPage";
import "./App.css";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const { initialized } = useSelector((state) => state.async);

  if (!initialized) return <AppLoader />;

  return (
    <div className="App">
      <CssBaseline />
      <AppNavigation>
        <Switch>
          <ProtectedRoute exact path="/" component={HomePage} />
          <Route
            path={"/(.+)"}
            render={() => (
              <>
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/error" component={ErrorComponent} />
              </>
            )}
          />
        </Switch>
      </AppNavigation>
    </div>
  );
}

export default App;
