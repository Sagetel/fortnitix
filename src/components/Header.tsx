import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { RootState } from "../store/store";
import { useSelector } from "react-redux/es/hooks/useSelector";
import UserProfile from "./UserProfile";

export default function Header() {
  const userIsLogin = useSelector(
    (state: RootState) => state.user.userIsLogedIn
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Fortnite Skins
            </Link>
          </Typography>
          {!userIsLogin ? (
            <>
              <Link
                to="/singin"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button color="inherit">Авторизация</Button>
              </Link>
              <Link
                to="/singup"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button color="inherit">Регистрация</Button>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/favorites"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button color="inherit">Избранное</Button>
              </Link>
              <UserProfile />
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
