import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/app'

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTHDOMAIN,
//     databaseURL: process.env.REACT_APP_BASEURL,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APP_ID
// };

const firebaseConfig = {
    apiKey: "AIzaSyAhGmF3MAXmO3myqoWsZcxEnHuKVZlb6y0",
    authDomain: "amazing-online-bookstore-oa.firebaseapp.com",
    databaseURL: "https://amazing-online-bookstore-oa-default-rtdb.firebaseio.com",
    projectId: "amazing-online-bookstore-oa",
    storageBucket: "amazing-online-bookstore-oa.appspot.com",
    messagingSenderId: "543742428874",
    appId: "1:543742428874:web:24b0921b246b537faad633",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth()

export default {
    firebaseConfig,
}