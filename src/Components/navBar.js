import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const NavBar= (props) =>{
  let username = localStorage.getItem("username");
  return (
    <div style={{ flexGrow: 1 ,  }}>
      <AppBar position="static" color="inherit" >
        <Toolbar >
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Welcome {username}
          </Typography>
          <Link to="/">
            <Button color="secondary" onClick={props.handleLogout}>
              Logout
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
