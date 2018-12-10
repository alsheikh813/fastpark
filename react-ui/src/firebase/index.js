import firebase from "firebase/app";
import "firebase/storage";
// Initialize Firebase

// TecPros/
var config = {
  apiKey: "AIzaSyCqmx8m6KKwWvXXoIJ20CTlfc9TNl3x5wg",
  authDomain: "fastpark-33a13.firebaseapp.com",
  databaseURL: "https://fastpark-33a13.firebaseio.com",
  projectId: "fastpark-33a13",
  storageBucket: "fastpark-33a13.appspot.com",
  messagingSenderId: "178411885411"
};

// // ClustererJSX/fastpark
// var config = {
//   apiKey: "AIzaSyBbfMF7qDLtr9ckKpOQQxlvScqn9cPZ1ew",
//   authDomain: "clustererjsx-fastpark.firebaseapp.com",
//   databaseURL: "https://clustererjsx-fastpark.firebaseio.com",
//   projectId: "clustererjsx-fastpark",
//   storageBucket: "clustererjsx-fastpark.appspot.com",
//   messagingSenderId: "868895992301"
// };


firebase.initializeApp(config);

const storage = firebase.storage();
export { storage, firebase as default };

/**

<script src="https://www.gstatic.com/firebasejs/5.7.0/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBbfMF7qDLtr9ckKpOQQxlvScqn9cPZ1ew",
    authDomain: "clustererjsx-fastpark.firebaseapp.com",
    databaseURL: "https://clustererjsx-fastpark.firebaseio.com",
    projectId: "clustererjsx-fastpark",
    storageBucket: "clustererjsx-fastpark.appspot.com",
    messagingSenderId: "868895992301"
  };
  firebase.initializeApp(config);
</script>
 */
