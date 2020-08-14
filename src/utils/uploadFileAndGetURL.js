import storage from "../config/firebaseStorage";
import { v4 as uuid } from "uuid";

export default async function uploadAndGetURL(file, path, imgSetter, progressSetter) {
  const storageRef = storage.ref();
  const fileName = `${uuid()}-${file.name}`;
  const pathRef = storageRef.child(`${path}/${fileName}`);
  const snapshot = await pathRef.put(file);
  const snapshotUrl = await snapshot.ref.getDownloadURL();
  if(imgSetter) imgSetter(snapshotUrl);
  return snapshotUrl;
}
