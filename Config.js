// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import * as firebase from 'firebase';





// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZGPrf2bGxytpAe34IqqMmMUTULiey1s4",
  authDomain: "evion-3fd09.firebaseapp.com",
  projectId: "evion-3fd09",
  storageBucket: "evion-3fd09.appspot.com",
  messagingSenderId: "416701610230",
  appId: "1:416701610230:web:ba633029e9ae39caf114d7",
  measurementId: "G-L07LWL3PZB"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export {firebase} ;
