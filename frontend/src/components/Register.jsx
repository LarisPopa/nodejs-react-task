import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "../style/Login.css";
import { registerService } from "../backend/UserService";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const result = await registerService(email, password);
      localStorage.setItem("email", result.email);
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      setError("");
      history.push("/dashboard");
    } catch (err) {
      if (err && err.response && err.response.status)
        setError("User already Exists");
      else setError("Unexpected error!");
    }
  };

  const goToLogin = () => {
    history.push("/");
  };
  return (
    <Row>
      <Col className="login_wrapper">
        {error && (
          <div className="login_error">
            <span>{error}</span>
          </div>
        )}
        <h2>Register</h2>
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
        <Button variant="primary" onClick={handleRegister}>
          Register
        </Button>
        <Button variant="primary" onClick={goToLogin}>
          Login
        </Button>
      </Col>
    </Row>
  );
};

export default Register;
