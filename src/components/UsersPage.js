import React, { useEffect, useState } from 'react'
import firebase from "firebase/compat/app";

const UsersPage = () => {
  const [users, setUsers] = useState([])

  const fetchPosts = async () => {
    const response = firebase.firestore().collection('users');
    const data = await response.get();
    data.docs.forEach(item=>{
      setUsers([...users,item.data()])
    })
  } 

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div>
      {
        users && users.map(user => {
          return(
            <div style={{marginTop: '100px'}} key={user.id}>
              {user.email}
                <br />
              {user.id}
            </div>
          )
        })
      }
    </div>
  )
}

export default UsersPage

