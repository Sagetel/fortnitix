import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AuthorizationMenu from "./AuthorizationMenu";

export default function Header() {
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fortnite Skins
          </Typography>
          <Button color="inherit" onClick={()=>{setIsOpenPopup(true)}}>Log in</Button>
          <AuthorizationMenu isOpenPopup={isOpenPopup} setIsOpenPopup={setIsOpenPopup}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
