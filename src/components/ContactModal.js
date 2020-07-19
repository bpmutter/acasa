import React, {useState, useEffect} from 'react';
import { makeStyles, Link, Typography, Avatar, List, 
  ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import ThemeButton from './Button'
import getUserByUid from '../queries/users/getUserByUid';
import MailIcon from "@material-ui/icons/Mail";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import LanguageIcon from "@material-ui/icons/Language";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import CircularProgress from "@material-ui/core/CircularProgress";
import getUserByUserName from '../queries/users/getUserByUserName';

const useStyles = makeStyles( theme => ({
    modalContent: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    outlineColor: theme.palette.secondary.light,
  },
  header: {
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    height: theme.spacing(12),
    width: theme.spacing(12),
    margin: theme.spacing(3)
    
  },
  title: {
    fontFamily: theme.typography.special,
    color: theme.palette.primary.dark
  },
  listWrapper: {
    display: 'flex', 
    alignItems: 'center', 
    flexDirection: 'column', 
    justifyContent: 'center'
  }
}));

export default function ContactModal({userToContact, username}){

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(userToContact || { contact: { email: null}})

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    if(user.contact.email === undefined){
        (async ()=>{
            const userInfo = await getUserByUserName(username);
            setUser(userInfo);
        })()
    }
  },[user.contact, user.uid])

  return (
    <>
      <ThemeButton onClick={handleOpen} style={{padding: '.5em'}}>Contact {user.first_name}</ThemeButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="aCasa log in"
        aria-describedby="log into your aCasa account here"
        disableAutoFocus={true}
      >
        <div className={classes.modalContent}>
          <div className={classes.header}>
            <Avatar
              src={user.profile_picture}
              alt={`${user.first_name} ${user.last_name}`}
              style={{ marginRight: 10 }}
              className={classes.avatar}
            />
            <Typography className={classes.title} component="h3" variant="h5">
              Contact {user.first_name} {user.last_name}
            </Typography>
          </div>
          {!user.contact.email && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "2em",
              }}
            >
              <CircularProgress color="secondary" />
            </div>
          )}
          {user.contact.email && user.uid && (
            <div className={classes.listWrapper}>
              <List>
                {user.contact.email && (
                  <ListItem>
                    <ListItemIcon>
                      <MailIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Link
                          href={`mailto:${user.contact.email}`}
                          target="_blank"
                        >
                          {user.contact.email}
                        </Link>
                      }
                    />
                  </ListItem>
                )}
                {user.contact.phone && (
                  <ListItem>
                    <ListItemIcon>
                      <PhoneAndroidIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Link href={`tel:${user.contact.phone}`}>
                          {user.contact.phone}
                        </Link>
                      }
                    />
                  </ListItem>
                )}
                {user.contact.whatsapp && (
                  <ListItem>
                    <ListItemIcon>
                      <WhatsAppIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Link href={`tel:${user.contact.whatsapp}`}>
                          {user.contact.whatsapp}
                        </Link>
                      }
                    />
                  </ListItem>
                )}
                {user.contact.website && (
                  <ListItem>
                    <ListItemIcon>
                      <LanguageIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Link
                          href={
                            user.contact.website.startsWith("https://") ||
                            user.contact.website.startsWith("http://")
                              ? user.contact.website
                              : `http://${user.contact.website}`
                          }
                          target="_blank"
                        >
                          {" "}
                          {user.contact.website}{" "}
                        </Link>
                      }
                    />
                  </ListItem>
                )}
              </List>
            </div>
          )}
        </div>
      </Modal>
    </>
  );

}