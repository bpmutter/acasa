/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import ThemeButton from './Button';
import CircularProgress from "@material-ui/core/CircularProgress";
import storage from '../config/firebaseStorage';
import { v4 as uuid } from 'uuid'
import {makeStyles} from '@material-ui/core';
import uploadFile from '../utils/uploadFileAndGetURL'
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";



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

export default function UploadOneImage({multiple, required, formSetter, urlSetter, preview, noPreview, disabled, setCustomLoading, ...props}){
    const id = uuid();
    const [imgUrl, setImgUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const classes = useStyles();
    const fileHandler = async e => {
        if(setCustomLoading) setCustomLoading();
        const file = e.currentTarget.files[0];
        const setter = inputVal => {
          setImgUrl(inputVal);
          if(formSetter) formSetter(inputVal)
        }
        if(file){ 
          setImgUrl('loading')
          const fileURL = await uploadFile(file, "listings", setter, setProgress);
          if(urlSetter) urlSetter(fileURL);

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
            disabled={disabled}
            {...props}
          />
          <label htmlFor={`upload-img-${id}`}>
            <ThemeButton>
              <PhotoCameraIcon style={{ marginRight: 10 }} />
              Upload{required ? "*" : null}
            </ThemeButton>
          </label>
        </div>

        {!noPreview &&( 
          <div className={classes.imgWrapper}>
            {imgUrl === "loading" && <CircularProgress value={progress} />}
            {imgUrl && imgUrl !== "loading" && preview && (
              <div
                className={classes.imgPreview}
                style={{ backgroundImage: `url(${imgUrl})` }}
              ></div>
          )}
        </div>
        )}
      </div>
    );
}