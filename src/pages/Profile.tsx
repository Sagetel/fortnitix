import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Button, Avatar } from "@mui/material";
import { supabase } from "../components/supabaseClient";
import userSvg from "../assets/user.svg";
import { logout } from "../store/action-creators/user";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      dispatch(logout());
      navigate("/");
    } catch (error: any) {
      console.error("Ошибка ", error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "85vh",
        backgroundColor: "background.default",
      }}
    >
      <Avatar
        src={userSvg}
        alt="User Avatar"
        sx={{
          width: 100,
          height: 100,
          marginBottom: 2,
        }}
      />
      <Typography variant="h5" color="text.primary" gutterBottom>
        {user?.userEmail || "User Email"}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogout}
        sx={{ marginTop: 2 }}
      >
        Выйти из аккаунта
      </Button>
    </Box>
  );
};

export default Profile;
