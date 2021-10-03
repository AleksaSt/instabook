import { useState, useEffect } from 'react'
import { projectStorage, projectFirestore, timestamp } from "../firebase"
import { useAuth } from "../contexts/AuthContext"

const ImagesUpload = (file, collection) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState(null)
  const { currentUser } = useAuth()

  useEffect(() => {
    
    let storageRef = projectStorage.ref(file.name)
    let collectionRef = collection == "images" ? projectFirestore.collection("images") : projectFirestore.collection("profileImages")

    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) *100
      setProgress(percentage)

    }, (err) => {
      setError(err)
    }, async () => {
      const url = await storageRef.getDownloadURL()
      const userId = currentUser.uid
      const createdAt = timestamp()
      if (collection = "profileImages") {
        const isActive = true
        setUrl(url)
        return collectionRef.add({ url, userId, isActive, createdAt })
      }
      collectionRef.add({ url, userId, createdAt })
    })
  }, [file])

  return { progress, url, error }
}

export default ImagesUpload
