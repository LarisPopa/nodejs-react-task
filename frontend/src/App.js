import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { getAccessToken } from "./backend/RESTUtils";
import { Container } from "react-bootstrap";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        getAccessToken() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const App = () => {
  return (
    <Container fluid>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </Container>
  );
};
export default App;
