import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

const generateUniqueFileName = (file) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const fileExtension = file.name.split(".").pop();
  return `${timestamp}_${randomString}.${fileExtension}`;
};

const uploadImageToFirebase = async (file) => {
  try {
    const uniqueFileName = generateUniqueFileName(file);
    const storageRef = ref(storage, `files/${uniqueFileName}`);

    const snapshot = await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(snapshot.ref);

    return { secure_url: downloadURL };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export default uploadImageToFirebase;
