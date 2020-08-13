import React, {useContext} from 'react';
import { Button, makeStyles } from "@material-ui/core";
import context from './Context';

const useStyles = makeStyles((theme) => ({
  button: {
    fontFamily: theme.typography.special,
    padding: theme.spacing(2),
    maxHeight: 40,
    textAlign: "center",
  },
}));

export default function DemoLogin(){
    const {demoLogin} = useContext(context);
    
    const loginDemoUser = e => {
        demoLogin();
    }
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ThemeButton onClick={loginDemoUser}>Demo Login</ThemeButton>
      </div>
    );
}



function ThemeButton({ children, color, ...props }) {
  const classes = useStyles();
  return (
    <Button
      {...props}
      className={classes.button}
      variant="contained"
      color={color || "primary"}
      component="div"
    >
      {children}
    </Button>
  );
}