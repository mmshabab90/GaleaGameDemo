import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import LockIcon from "@material-ui/icons/Lock";
import { signOutFirebase } from "../../App/firestore/firebaseService";

export default function SignedInMenu() {
  const history = useHistory();

  async function handleSignOut() {
    try {
      await signOutFirebase();
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <List>
      <ListItem button component={NavLink} to="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>

      <Divider />

      <ListItem button component={NavLink} to="/" onClick={handleSignOut}>
        <ListItemIcon>
          <LockIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );
}
