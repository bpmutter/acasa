/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import ThemeButton from './Button';
import CircularProgress from "@material-ui/core/CircularProgress";
import storage from '../config/firebaseStorage';
import { v4 as uuid } from 'uuid'
import {makeStyles} from '@material-ui/core';
import uploadFile from '../utils/uploadFile'

// function uploadFile(file, path, imgSetter, progressSetter){
//     const storageRef = storage.ref();
    
//     const fileName = `${uuid()}-${file.name}`;
//     const pathRef = storageRef.child(`${path}/${fileName}`);
//     const uploadTask = pathRef.put(file)
    
//     uploadTask.on(
//       "state_changed",
//       function (snapshot) {
        
//         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//         // console.log("Upload is " + progress + "% done");
//         if(progressSetter) progressSetter(progress);
        
//       },
//       function (error) {
//         alert('There was a problem uploading the file. Please try again later.')
//         console.error(error)
//       },
//       function () {
//         uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
//           console.log("File available at", downloadURL);
//           imgSetter(downloadURL);
//         });
//       }
//     );
// }

const useStyles = makeStyles((theme) => ({
  root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row'
  },
  button: {
      display: 'inline-block'
  },
  imgWrapper: {
      padding: '.5em',
      paddingLeft: '1em',
      display: 'inline-block',
      position: 'relative',
      zIndex: 1,
      top: 12
  },
  imgPreview: {
    width: 100,
    height: 100,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundColor: theme.palette.text.secondary
  },
}));

export default function UploadOneImage({multiple, required, formSetter}){
    const id = uuid();
    const [imgUrl, setImgUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const classes = useStyles();
    const fileHandler = async e => {
        const file = e.currentTarget.files[0];
        const setter = inputVal => {
          setImgUrl(inputVal);
          if(formSetter) formSetter(inputVal)
        }
        if(file){ 
          setImgUrl('loading')
          await uploadFile(file, "listings", setter, setProgress);
        }
    }        
        
    
    
    return (
      <div>
        <div className={classes.button}>
          <input
            accept="image/*"
            hidden
            id={`upload-img-${id}`}
            multiple={multiple}
            type="file"
            onChange={fileHandler}
          />
          <label htmlFor={`upload-img-${id}`}>
            <ThemeButton>Upload Image{required ? "*" : null}</ThemeButton>
          </label>
        </div>

        <div className={classes.imgWrapper}>
          {imgUrl === "loading" && <CircularProgress value={progress} />}
          {imgUrl && imgUrl !== "loading" && (
            <div
              className={classes.imgPreview}
              style={{ backgroundImage: `url(${imgUrl})` }}
            ></div>
          )}
        </div>
      </div>
    );
}