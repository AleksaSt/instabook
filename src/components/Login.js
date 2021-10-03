import React, { useRef, useState } from "react"
import { Card, Button, Form, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router"
import LoginCSS from "../css/Login.module.css"

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to Sign in")
    }
    setLoading(false)
  }
  
  return (
    <>
    <div className={LoginCSS.mainDiv}>
      <Card className={LoginCSS.mainCard}>
        <Card.Body>
          <h1 className={LoginCSS.mainHeading}>Log in</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label className={LoginCSS.emailAndPassword}>Email address</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label className={LoginCSS.emailAndPassword}>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <div className={LoginCSS.registerText}>Don't have an account? Register<a href="/signup"> here</a></div>
            <div className={LoginCSS.MainButtonDiv}>
              <Button disabled={loading} variant="primary" type="submit" className={LoginCSS.button}>
                Log In
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
      
    </>
  )
}

export default Login
