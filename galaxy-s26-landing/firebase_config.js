const firebaseConfig = {
  apiKey: "AIzaSyCkfybR4gho1jr0LiCUeR_SIUSgJWPufSE",
  authDomain: "galaxys26-77cda.firebaseapp.com",
  projectId: "galaxys26-77cda",
  storageBucket: "galaxys26-77cda.firebasestorage.app",
  messagingSenderId: "873566394932",
  appId: "1:873566394932:web:389aea12bae1d5ea43c861"
};

// 파이어베이스 초기화 (중복 초기화 방지)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Firestore DB 사용 변수
const db = firebase.firestore();
