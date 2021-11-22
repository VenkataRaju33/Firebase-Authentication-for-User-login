import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import {firestore} from '../firebase'
import './image.css'
export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const [user,setUser]=useState('')
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  const userRef=firestore.doc(`users/${currentUser.uid}`);
  const snapshot= userRef.get().then(snap=>{
    setUser(snap.data())
  });
  firestore.collection('users').onSnapshot(snap=>{
    //setUser(snap.docs.filter(doc=>doc.data().email===currentUser.email)[0])
  })
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}

           {user&&<div><img  style={{borderRadius:"50%"}} src= {user?.url??"http://via.placeholder.com/150x150"}/>
         <div> <strong>Address:</strong> {user?.address}</div>
         <div><strong>Date of birth:</strong> {user?.dob}</div></div>}
          <Link to="/update-details" className="btn btn-primary w-100 mt-3">
            Update details
          </Link>
          <Link to="/change-password" className="btn btn-primary w-100 mt-3">
            Change Password
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  )
}
