import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore'
import 'firebase/storage'

const app = firebase.initializeApp({
  apiKey: "AIzaSyCyMEGsc9ci7JO94T3crCLiTgAeg7-pTmw",
  authDomain: "authentication-f8f3b.firebaseapp.com",
  projectId: "authentication-f8f3b",
  storageBucket: "authentication-f8f3b.appspot.com",
  messagingSenderId: "892701410078",
  appId: "1:892701410078:web:959820b7ad044cb003bf0f",
  measurementId: "G-MCNKSZ23Y5"
})
export const firestore=firebase.firestore()
export const auth = app.auth()
export const storage=firebase.storage()
export default {app,firestore}

export const createUserDocument=async(user,additionalData)=>{
  if(!user) return;
  const userRef=firestore.doc(`users/${user.uid}`);
  const snapshot=await userRef.get();
  console.log(snapshot,'snapshot')
  if(!snapshot.exists){
    const {email}=user;
    const {dob,address,url}=additionalData;
     console.log(additionalData,'additional data')
    try{console.log(url,'Error')
      userRef.set({
        dob,
        email,
        url,
        address,
        createdAt:new Date(),
        
      });
    }catch (error){
      console.log('Error', error);
    }
  }
};