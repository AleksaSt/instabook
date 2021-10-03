import React, { useRef, useState } from "react"
import { Card, Button, Form, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router"
import SignupCSS from "../css/Signup.module.css"

const SignUp = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if(passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch (error) {
      switch (error.code) {
        case 'auth/weak-password':
          setError(error.message)
          break;
      }
    }
    setLoading(false)
  }
  
  return (
    <>
      <div className={SignupCSS.mainDiv}>
        <Card className={SignupCSS.mainCard}>
        <h1 className={SignupCSS.mainHeading}>Sign up</h1>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label className={SignupCSS.emailAndPassword}>Email address</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label className={SignupCSS.emailAndPassword}>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label className={SignupCSS.emailAndPassword}>Confirm Password</Form.Label>
                <Form.Control type="password"ref={passwordConfirmRef} required />
              </Form.Group>
              <div className={SignupCSS.registerText}>Already have an account? Log in<a href="/login"> here</a></div>
              <div className={SignupCSS.MainButtonDiv}>
                <Button disabled={loading} variant="primary" type="submit" className={SignupCSS.button}>
                  Sign Up
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default SignUp
