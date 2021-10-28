import React, { useState } from 'react'
import { Nav, Container, Navbar } from "react-bootstrap"
import {BsBook} from "react-icons/bs"
import NavCSS from "../css/Navbar.module.css"
import { useAuth } from '../contexts/AuthContext'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const NavbarPage = () => {
  // const [userId, setUserId] = useState(false)
  // const { currentUser } = useAuth()
  // if (currentUser !== null) {
  //   const uid = currentUser.uid
  // }

  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top">
    <Container>
    <Navbar.Brand href="/">Instabook</Navbar.Brand>
    <BsBook size={"18px"} className={NavCSS.svg} />
    <Nav className="me-auto">
      <Nav.Link href="/">Profile</Nav.Link>
      {/* <Nav.Link href="/">{ && <p>Profile</p>}</Nav.Link> */}
      <Nav.Link href="/signup">Sign Up</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
    </>
  )
}

export default NavbarPage
