const firebaseConfig = {
  apiKey: "AIzaSyB9IobD2r9yDiQ6_Ao_ISr3I7UiTw_Nuo8",
  authDomain: "aandf-poultry-farm.firebaseapp.com",
  projectId: "aandf-poultry-farm",
  storageBucket: "aandf-poultry-farm.firebasestorage.app",
  messagingSenderId: "931836019972",
  appId: "1:931836019972:web:6d5ca98eaaca112ffb3c51"
};

firebase.initializeApp(firebaseConfig);

const farmAuth = firebase.auth();
const farmDB = firebase.firestore();
