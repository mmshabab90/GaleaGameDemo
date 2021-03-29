import { CssBaseline } from "@material-ui/core";
import { Route, Switch } from "react-router";
import HomePage from "../components/home/HomePage";
import LoginPage from "../components/login/LoginPage";
import AppNavigation from "../components/navigation/AppNavigation";
import RegisterPage from "../components/register/RegisterPage";
import "./App.css";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <AppNavigation>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <ProtectedRoute exact path="/" component={HomePage} />
        </Switch>
      </AppNavigation>
    </div>
  );
}

export default App;
