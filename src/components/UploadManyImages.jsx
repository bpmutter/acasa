import React, {useState, useEffect} from "react";
import ImageUploader from "react-images-upload";
import { useTheme, makeStyles, CircularProgress, Typography } from "@material-ui/core";
import bulkUploadFiles from '../utils/bulkUploadFiles';
import ImageGrid from './ImageGrid';
import { set } from "lodash";

const useStyles = makeStyles((theme) => ({
  imagesLoading: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: 'white',
    padding: theme.spacing(2)
  },
  progress: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }
}));

export default function UploadManyImgs({formSetter, defaultImages=[]}){
    const classes = useStyles();
    
    const [uploadedPics, setUploadedPics] = useState([]);
    const [uploadStatus, setUploadStatus] = useState(null);


    const theme = useTheme();
    const styles = {
      buttonStyles: {
        fontFamily: theme.typography.special,
        padding: theme.spacing(2),
        maxHeight: 50,
        textAlign: "center",
        backgroundColor: theme.palette.primary.main,
        borderRadius: theme.spacing(0.5),
      },
      
    };
    
    const onDrop = async pictures => { 
        debugger;
        setUploadStatus(true);
        const urls = await bulkUploadFiles(pictures, "listings");
        setUploadedPics(urls);
        setUploadStatus(false);
        if(formSetter) formSetter(urls);

    }

    

    return (
      <div>
        <ImageUploader
          withIcon={true}
          buttonText="Select Additional Images"
          buttonStyles={styles.buttonStyles}
          onChange={onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".webp"]}
          maxFileSize={5242880}
        />

        <div className={classes.imgFrame}>
          <>
            {!uploadedPics.length && !!defaultImages.length && (
              <ImageGrid imgs={defaultImages} />
            )}
          </>
          {uploadStatus && (
            <div className={classes.imagesLoading}>
              <CircularProgress size={100} className={classes.progress} />
              <Typography align="center" component="p">
                Images uploading. This can take a moment. Please be patient{" "}
                <span role="img" aria-label="smile emoji">
                  😀
                </span>
              </Typography>
            </div>
          )}
          <>{!!uploadedPics.length && <ImageGrid imgs={uploadedPics} />}</>
        </div>
      </div>
    );
}
