import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import userSvg from "../assets/user.svg";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function UserProfile() {
  const [email, setEmail] = useState<string>("");
  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setEmail(data.user?.email || "");
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          padding: 2,
          borderRadius: 2,
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}
      >
        <Box
          component="img"
          src={userSvg}
          alt="User Icon"
          sx={{
            width: 30,
            height: 30,
          }}
        />
        <Typography variant="body1" fontWeight="bold">
          {email || "Unknow"}
        </Typography>
      </Box>
    </Link>
  );
}

export default UserProfile;
