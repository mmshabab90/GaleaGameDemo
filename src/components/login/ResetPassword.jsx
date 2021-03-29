import React, { useState } from "react";
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { requestResetPassword } from "../../App/firestore/firebaseService";
// import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  textField: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function ResetPassword({ setResetPassword }) {
  const classes = useStyles();
  const [email, setEmail] = useState("");

  return (
    <form>
      <Typography style={{ marginBottom: 15 }} component="h5" variant="h4">
        Request Password Reset
      </Typography>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        className={classes.textField}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button
        color="inherit"
        variant="contained"
        fullWidth
        className={classes.button}
        onClick={(e) => {
          e.preventDefault();
          requestResetPassword(email);
        }}
      >
        Send Email
      </Button>

      <Button
        color="secondary"
        fullWidth
        className={classes.button}
        onClick={() => setResetPassword(false)}
      >
        Cancel
      </Button>
    </form>
  );
}
