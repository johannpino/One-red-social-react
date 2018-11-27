import firebase from 'firebase'

const config = {
    apiKey: "Key",
    authDomain: "one-red-social-react.firebaseapp.com",
    databaseURL: "https://one-red-social-react.firebaseio.com",
    projectId: "one-red-social-react",
    storageBucket: "one-red-social-react.appspot.com",
    messagingSenderId: "908246232549"
  };
  
firebase.initializeApp(config);

export default firebase