import React from "react";
import { useHistory } from "react-router";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import Alert from "@material-ui/lab/Alert";
import { registerInFirebase } from "../../App/firestore/firebaseService";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: theme.spacing(55),
    padding: theme.spacing(3),
    textAlign: "center",
  },
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  textField: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const validationSchema = yup.object({
  displayName: yup
    .string("Enter your display name")
    .required("Display name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be minimum of 8 characters")
    .required("Password is required"),
});

export default function RegisterPage() {
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      try {
        if (values.password !== values.confirmPassword) {
          setError("Password and Confirm Password does not match!");
        } else {
          setError(null);
          await registerInFirebase(values);
          resetForm({ values: "" });
          history.push("/");
        }
      } catch (error) {
        setErrors({ auth: error.message });
        setSubmitting(false);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Grid container direction="column" justify="center" alignItems="center">
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="displayName"
            name="displayName"
            label="Display Name"
            className={classes.textField}
            value={formik.values.displayName}
            onChange={formik.handleChange}
            error={
              formik.touched.displayName && Boolean(formik.errors.displayName)
            }
            helperText={formik.touched.displayName && formik.errors.displayName}
          />

          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            className={classes.textField}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            className={classes.textField}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            className={classes.textField}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />

          {error && (
            <div className={classes.textField}>
              <Alert severity="error">{error}</Alert>
            </div>
          )}

          {formik.errors.auth && (
            <Alert severity="error">{formik.errors.auth}</Alert>
          )}

          <Button
            color="inherit"
            variant="contained"
            fullWidth
            type="submit"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
      </Grid>

      <Grid container direction="column" justify="center" alignItems="center">
        <Typography component="h4" variant="h6">
          OR
        </Typography>
      </Grid>

      <Grid container direction="column" justify="center" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<MailIcon />}
          fullWidth={true}
          onClick={() => history.push("/login")}
        >
          Login with Email
        </Button>
      </Grid>
    </Container>
  );
}
