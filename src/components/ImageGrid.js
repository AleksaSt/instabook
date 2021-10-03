import React from 'react'
import useFirestore from '../hooks/useFirestore'
import ImageGridCSS from '../css/ImageGrid.module.css'
import { motion } from "framer-motion"

const ImageGrid = ({ setSelectedImg, collection, onSelectedProfileImage }) => {
  const { docs } = useFirestore(collection)

  if (collection = 'profileImages') {
    onSelectedProfileImage(docs)
  }
  
  console.log(docs)

  return (
    <div className={ImageGridCSS.imageGrid}>
      {docs && docs.map(doc => (
        <motion.div className={ImageGridCSS.imageDiv} key={doc.id}
         onClick={() => setSelectedImg(doc.url)} 
         whileHover={{ opacity: 1 }}
         layout
        >
          <motion.img src={doc.url} alt="Uploaded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default ImageGrid
