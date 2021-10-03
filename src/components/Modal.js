import React from 'react'
import ModalCSS from "../css/Modal.module.css"
import { motion } from "framer-motion"

const Modal = ({ selectedImg, setSelectedImg}) => {

  const handleClick = (e) => {
    if(e.target.classList.contains(`${ModalCSS.modalMain}`)) {
      setSelectedImg(null)
    }
  }

  return (
    <motion.div className={ModalCSS.modalMain} onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img src={selectedImg} alt="enlarged picture"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      />
    </motion.div>
  )
}

export default Modal
