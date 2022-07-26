import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { AppError } from "../middlewares";

function firebaseInitialize() {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID,
  };

  const app = initializeApp(firebaseConfig);

  return app;
}

// multer로 이미지 가져오기
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
}).single("image");

// image upload 후 img url 가져오기
async function getImageUrl(image: Express.Multer.File) {
  try {
    const timestamp = Date.now();
    const name = image.originalname.split(".")[0];
    const type = image.originalname.split(".")[1];
    const fileName = `${name}_${timestamp}.${type}`;

    const storage = getStorage(firebaseInitialize());
    const imageRef = ref(storage, `images/${fileName}`);
    const metadata = {
      contentType: `image/${type}`,
    };
    const snapshot = await uploadBytes(imageRef, image.buffer, metadata);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    throw new AppError(
      500,
      "이미지 업로드를 실패했습니다.",
      (<Error>error).name
    );
  }
}

// image delete
async function deleteImage(imgUrl: string) {
  try {
    const storage = getStorage(firebaseInitialize());
    const imageRef = ref(storage, imgUrl);
    await deleteObject(imageRef);
  } catch (error) {
    throw new AppError(500, "이미지 삭제를 실패했습니다.", (<Error>error).name);
  }
}

export { upload, getImageUrl, deleteImage };
