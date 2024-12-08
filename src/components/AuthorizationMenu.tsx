import React, { useState } from "react";
import MyModal from "./MyModal";
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


interface Props {
  isOpenPopup: boolean;
  setIsOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

function AuthorizationMenu({ isOpenPopup, setIsOpenPopup }: Props) {
  const dispatch = useAppDispatch();
  const [isRegister, setIsRegister] = useState(true);
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
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleToggle = () => {
    setIsRegister(!isRegister);
    reset();
  };


  const onSubmit = async (dataAuth: { email: string; password: string }) => {

    try { 
      if (isRegister) {
        await handleRegister(dataAuth);
        alert("Регистрация прошла успешно");
      } else {
        const userLogin = await handleLogin(dataAuth);
        alert("Авторизация прошла успешно");
        dispatch(login(userLogin));
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
    <MyModal isOpenPopup={isOpenPopup} setIsOpenPopup={setIsOpenPopup}>
      <Box sx={style}>
        <Typography variant="h5" component="h2">
          {isRegister ? "Регистрация" : "Авторизация"}
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
            {isRegister ? "Зарегистрироваться" : "Войти"}
          </Button>
        </form>
        <Button
          onClick={handleToggle}
          sx={{ textTransform: "none", marginTop: "8px" }}
        >
          {isRegister
            ? "Уже есть аккаунт? Войти"
            : "Нет аккаунта? Зарегистрироваться"}
        </Button>
      </Box>
    </MyModal>
  );
}

export default AuthorizationMenu;
