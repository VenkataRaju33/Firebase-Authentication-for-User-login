import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from "react-bootstrap"
import {  useHistory } from "react-router-dom"
import {createUserDocument,storage} from '../firebase'
import './image.css'

// import { storage } from '.firebase';
 import { useAuth } from "../contexts/AuthContext"
export default function Update() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [image,setImage]=useState(null)
    const [imagefile,setImagefile]=useState(null)
    const [url,setUrl]=useState('')
    const history = useHistory()
    const dateRef= useRef()
    const addressRef= useRef()
    //const imageRef=useRef()
    const {currentUser}=useAuth()
    const handleImageClick=()=>{
      document.getElementById("myfile").click();
    }
    const handleImage=e=>{
      console.log(e.target.files[0],'image')
      var reader = new FileReader();
      var imageUrl = reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = function (e) {
      
        setImage( [reader.result])
    
        }
      if(e.target.files[0]){setImagefile(e.target.files[0])}
    }

    async function handleSubmit(e) {
        e.preventDefault()
    const uploadTask =storage.ref(`images/${imagefile.name}`).put(imagefile);
    uploadTask.on(
      "state_changed",
      snapshot=>{},
      error=>{
        console.log(error);
      },
      ()=>{
        storage
        .ref("images")
        .child(imagefile.name)
        .getDownloadURL()
        .then(url=>{
          console.log(url,'URL')
          setUrl(url)
          try { 
            setError("")
            setLoading(true)
            const dob=dateRef.current.value;
            const address=addressRef.current.value;
            console.log(url,'URL12345')
             createUserDocument(currentUser,{dob,address,url})
            history.push("/")
          } catch {
            setError("Failed to create an account")
            console.log('Error', error);
          }
        })
      }
    )
        
        console.log(dateRef.current.value,addressRef.current.value,'submit')
        
    
        setLoading(false)
      }
    
    return(
        <>
        <Card>
          <Card.Body>
            <h1 className="text-center mb-4" >Update</h1>
            {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} >
            
          <div><img onClick={handleImageClick} src={image??"http://via.placeholder.com/150x150" } alt='hi' style={{borderRadius:"50%"}}/>
   <input type="file" id="myfile" style={{display:'none'}} onChange={handleImage} /></div>

            <Form.Group id="date">
              <Form.Label>Date-of-birth</Form.Label>
              <Form.Control
                type="date"
                
                ref={dateRef}
                
              /> 
            </Form.Group>
            <Form.Group id="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder='Enter your address..'
                ref={addressRef}
                
              /> 
            </Form.Group>
            <div className="w-100 text-center mt-2">
              <Button disabled={loading} className="w-100" type="submit" >
              Save
             </Button>
             </div>
            </Form>
           </Card.Body>
          </Card>
          
          </>
    )
}