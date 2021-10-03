import React from "react";
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute";
import UploadForm from "./UploadForm";
import NavbarPage from "./NavbarPage";
import Footer from "./Footer";
import ErrorPage from "./ErrorPage";

function App() {
  return (
    <Container>
      <Router>
      <NavbarPage />
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/gallery" component={UploadForm} />
            <Route path='*' component={ErrorPage} />
          </Switch>
        </AuthProvider>
      <Footer />
      </Router>
    </Container>
  ) 
}

export default App;
