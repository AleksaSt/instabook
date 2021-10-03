import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import ImageGrid from './ImageGrid'
import FormCSS  from "../css/Form.module.css"
import Modal from "./Modal"

const UploadForm = () => {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [selectedImg, setSelectedImg] = useState(null)

  const types = ["image/jpeg", "image/png"]

  const changeHandler = (e) => {

    let selected = e.target.files[0]
    // console.log(selected)
    if(selected && types.includes(selected.type)){
      setFile(selected)
      setError("")
    } else {
      setFile(null)
      setError("Selected file must be a jpeg or png")
    }
  }

  return (
    <form>
      <h1 className={FormCSS.heading}>Your Pictures</h1>
      <h5 className={FormCSS.headingTwo}>Post your favorite pictures in your very own gallery!</h5>
      <div className={FormCSS.formDiv}>
      <label className={FormCSS.formLabel} for="input-file">
          <div>+</div>
        </label>
      </div>
        <input type="file" id="input-file" onChange={changeHandler} />
        {error && <div className={FormCSS.error}>{error}</div> }
        {file && <ProgressBar file={file} setFile={setFile} collection={'images'}/>}
        <ImageGrid setSelectedImg={setSelectedImg} collection={'images'}/>
        {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
    </form>
  )
}

export default UploadForm
