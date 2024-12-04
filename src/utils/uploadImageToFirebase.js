import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

const uploadImageToFirebase = async (file) => {
  try {
    const storageRef = ref(storage, `files/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return { secure_url: downloadURL };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export default uploadImageToFirebase;
