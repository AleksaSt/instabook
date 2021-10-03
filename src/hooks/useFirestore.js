import { useState, useEffect } from 'react'
import { projectFirestore } from '../firebase'
import { useAuth } from "../contexts/AuthContext"

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([])
  const { currentUser } = useAuth()

  useEffect(()=> {

    let unsub = null;
    switch (collection) {
      case 'images':
        unsub = projectFirestore.collection(collection).where('userId', '==', currentUser.uid)
        break;
      case 'profileImages':
        unsub = projectFirestore.collection(collection).where('userId', '==', currentUser.uid).where('isActive', '==', true);
        break;
      case 'users':
        unsub = projectFirestore.collection(collection)
    }

    
    unsub
    .orderBy('createdAt', 'desc')
    .onSnapshot((snap) => {
      let documents = []
      snap.forEach(doc => {
        documents.push({...doc.data(), id: doc.id})
      });
      setDocs(documents)
    })
    // return () => unsub()

  }, [collection])

  return {docs} 
}

export default useFirestore
