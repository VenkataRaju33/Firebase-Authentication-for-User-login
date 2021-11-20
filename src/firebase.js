import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyCyMEGsc9ci7JO94T3crCLiTgAeg7-pTmw",
  authDomain: "authentication-f8f3b.firebaseapp.com",
  projectId: "authentication-f8f3b",
  storageBucket: "authentication-f8f3b.appspot.com",
  messagingSenderId: "892701410078",
  appId: "1:892701410078:web:959820b7ad044cb003bf0f",
  measurementId: "G-MCNKSZ23Y5"
})

export const auth = app.auth()
export default app
