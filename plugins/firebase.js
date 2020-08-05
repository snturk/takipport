import * as firebase from 'firebase/app'

var firebaseConfig = {
  apiKey: "AIzaSyC-gk1IsHoGxJbjSqu3R4OJEf34lm4_Vs0",
  authDomain: "smmm-takip.firebaseapp.com",
  databaseURL: "https://smmm-takip.firebaseio.com",
  projectId: "smmm-takip",
  storageBucket: "smmm-takip.appspot.com",
  messagingSenderId: "440457413106",
  appId: "1:440457413106:web:f1d41357e64c264c6eab6b",
  measurementId: "G-50NJZHWMD4"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default async ({redirect}) => {
  await firebase.auth().onAuthStateChanged(user=>{
    if(user){
      redirect('/home');
    }else{
      redirect('/');
      firebase.auth().signOut();
    }
  })
}