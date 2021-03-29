import { Button, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ErrorComponent() {
  const { error } = useSelector((state) => state.async);
  return (
    <Container fixed>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Typography component="h4" variant="h6">
            {error?.message || "Oops - we have an error"}
          </Typography>
        </Grid>

        <Grid item>
          <Button component={Link} to="/" style={{ marginTop: 30 }}>
            Return to Home
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
