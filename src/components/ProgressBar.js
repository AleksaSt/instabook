import React, { useEffect } from 'react'
import ProgressCSS from "../css/ProgressBar.module.css"
import { motion } from "framer-motion"
import ImagesUpload from "../storage-upload/ImagesUpload"

const ProgressBar = ({file, setFile, collection}) => {
  const { url, progress } = ImagesUpload(file, collection)

  useEffect(() => {

    if(url){
      setFile(null)
    } 

  }, [url, setFile])

  return (
    <motion.div className={ProgressCSS.loading} 
      initial={{ width: 0 }}
      animate={{ width: progress + "%"}}
    ></motion.div>
  )
}

export default ProgressBar