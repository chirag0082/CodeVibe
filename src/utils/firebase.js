import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBfqshyAEN_l1XV0fgY7fYLxQ8rnizK0sI",
  authDomain: "alterx-86006.firebaseapp.com",
  projectId: "alterx-86006",
  storageBucket: "alterx-86006.appspot.com",
  messagingSenderId: "727146738922",
  appId: "1:727146738922:web:5c4cbf9c3218be06791393",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export default app;
