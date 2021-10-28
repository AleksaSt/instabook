import React, { useContext, useState, useEffect } from 'react'
import { auth } from "../firebase"
import firebase from "firebase/compat/app";

const AuthContext = React.createContext()

export function useAuth() {
  let data = useContext(AuthContext)
  return useContext(AuthContext)
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    console.log('signup')
    auth.createUserWithEmailAndPassword(email, password).then(r => {
      let db = firebase.firestore();
      db.collection("users").doc(r.user.uid).set({
        id: r.user.uid,
        isActive: true,
        email: email
      });
    })
    // return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    
    return unsubscribe
    
  }, [])
  
  const value = {
    currentUser,
    login, 
    signup,
    logout
  }
  // console.log(currentUser)
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
  
}


