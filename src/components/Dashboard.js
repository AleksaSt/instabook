import React, { useState } from 'react'
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import DashCSS from "../css/Dashboard.module.css"
import ProgressBar from './ProgressBar'
import ImageGrid from './ImageGrid'
import Modal from "./Modal"
import firebase from "firebase/compat/app";

export default function Dashboard() {
  const [file, setFile] = useState(null)
  const [error, setError] = useState()
  const [uploadError, setUploadError] = useState()
  const {currentUser, logout} = useAuth()
  const history = useHistory()
  const [selectedImg, setSelectedImg] = useState(null)
  const [profileImage, setProfileImage] = useState(null)

  const types = ["image/jpeg", "image/png"]

  const setActiveProfileImage = (image) => {
    setProfileImage(...image)
  }

  const changeHandler = (e) => {

    if (profileImage) {
      let db = firebase.firestore();
      db.collection("profileImages").doc(profileImage.id).update({isActive: false});
    }

    let selected = e.target.files[0]

    if(selected && types.includes(selected.type)){
      setFile(selected)
      setUploadError("")
    } else {
      setFile(null)
      setUploadError("Selected file must be a jpeg or png")
    }
  }

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <section className={DashCSS.sectionMain}>
      {/* <h1 className={DashCSS.headingOne}>Welcome to your Profile Page!</h1>  */}
      <form className={DashCSS.mainDiv}>
        <Card className={DashCSS.mainCard}>
        <Card.Body>
          <h2 className={DashCSS.headingTwo}>Your Profile</h2>
          {file && <div>{file.name}</div> }
          <div className={DashCSS.formDiv}>
            <label className={DashCSS.formLabel} for="input-file">
              <div>+</div>
            </label>
          </div>
          <input type="file" id="input-file" onChange={changeHandler}/>
          {error && <Alert variant="danger">{error}</Alert>}
          {uploadError && <Alert variant="danger">{uploadError}</Alert>}
          {file && <ProgressBar file={file} setFile={setFile} collection={'profileImages'}/>}
          <ImageGrid setSelectedImg={setSelectedImg} collection={'profileImages'} onSelectedProfileImage={ setActiveProfileImage }/>
          {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
          <div className={DashCSS.email}>Email: {currentUser.email}</div>
          <Link to="/gallery">
            <div>Go to gallery</div>
          </Link>
          <div className={DashCSS.MainButtonDiv}>
            <Button onClick={handleLogout} variant="primary" className={DashCSS.button}>
              Log Out
            </Button>
          </div>
        </Card.Body>
        </Card>
      </form>
    </section>
  )
}
