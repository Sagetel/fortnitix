import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../store/hooks";
import { loginError, login } from "../store/action-creators/user";
import { handleLogin, handleRegister } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  isRegisterForm?: boolean;
}

function AuthorizationMenu({ isRegisterForm = false }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Введите корректный email")
      .required("Поле Email обязательно"),
    password: yup
      .string()
      .min(6, "Пароль должен содержать не менее 6 символов")
      .required("Поле Пароль обязательно"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (dataAuth: { email: string; password: string }) => {
    try {
      if (isRegisterForm) {
        await handleRegister(dataAuth);
      } else {
        const userLogin = await handleLogin(dataAuth);
        dispatch(login(userLogin));
        navigate("/");
      }
    } catch (error: any) {
      console.error("Ошибка: ", error.message);
      dispatch(loginError(error.message));
    }
  };

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    padding: "24px",
  };

  return (
    <Box sx={style}>
      <Typography variant="h5" component="h2">
        {isRegisterForm ? "Регистрация" : "Авторизация"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              required
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Пароль"
              type="password"
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              required
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: "16px" }}
        >
          {isRegisterForm ? "Зарегистрироваться" : "Войти"}
        </Button>
      </form>
      <Button sx={{ textTransform: "none", marginTop: "8px" }}>
        {isRegisterForm ? (
          <Link
            to="/singin"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Уже есть аккаунт? Войти
          </Link>
        ) : (
          <Link
            to="/singup"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Нет аккаунта? Зарегистрироваться
          </Link>
        )}
      </Button>
    </Box>
  );
}

export default AuthorizationMenu;
