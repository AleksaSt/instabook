import React from 'react'
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import ErrorCSS from "../css/Error.module.css"
import error from "../assets/error.jpg"

const Error = () => {
  return (
    <div className={ErrorCSS.mainDiv}>
      <div className={ErrorCSS.errorDiv}>
        <h1>Whoops!</h1>
        <p>The page you were looking for does not exist! Click on the button to return to the Home Page</p>
        <Link to='/'>
          <Button className={ErrorCSS.btn} variant="primary">Go Back To Home</Button>
        </Link> 
      </div>
      <img src={error} alt="Error page.jpg" className={ErrorCSS.image}/>
    </div>
  )
}

export default Error
