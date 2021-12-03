import React from 'react'
import { app, db } from './FirebaseConfig';
import { useState, useEffect } from 'react'
import { collection, setDoc, query, where, onSnapshot } from "firebase/firestore"; 
import { doc, getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



// const SignUpUser=()=>{
//     const auth = getAuth();
// setDoc(doc(db, "Accounts",email), {
// "user":{
// "Property" : "value"
// } 

// });
// createUserWithEmailAndPassword(auth, email, password)
// .then((userCredential) => {
// alert("Your Account Is Created")
// const user = userCredential.user;

// })
// .catch((error) => {
// alert("An Error Occured")
// const errorCode = error.code;
// const errorMessage = error.message;
// // ..
// });
 
// }

// export {SignUpUser}


// setDoc(doc(db, "Accounts", email), {
//     user: {
//       userName,
//       email,
//       gender,
//       phone,
//       password,
//       dob,
//       profPic : imgUrl
//     },
//   });