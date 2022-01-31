import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "../style/Login.css";
import { loginService } from "../backend/UserService";
import { useHistory } from "react-router-dom";
import { getAccessToken } from "../backend/RESTUtils";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //go to tasks if user is loggin
  useEffect(() => {
    if (getAccessToken()) {
      history.push("/dashboard");
    }
  }, []);

  const handleLogin = async () => {
    try {
      const result = await loginService(email, password);
      localStorage.setItem("email", result.email);
      localStorage.setItem("accessToken", result.accessToken);
      setError("");
      history.push("/dashboard");
    } catch (err) {
      if (err && err.response && err.response.status)
        setError("Invalid Credentials!");
      else setError("Unexpected error!");
    }
  };

  const goToRegister = () => {
    history.push("/register");
  };
  return (
    <Row>
      <Col className="login_wrapper">
        {error && (
          <div className="login_error">
            <span>{error}</span>
          </div>
        )}
        <h2>Login</h2>
        <Form.Control
          placeholder={"Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Control
          type="password"
          placeholder={"Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
        <Button variant="primary" onClick={goToRegister}>
          Register
        </Button>
      </Col>
    </Row>
  );
};

export default Login;
