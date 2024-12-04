import React, { useState } from "react";
import MyModal from "./MyModal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createClient } from "@supabase/supabase-js";

interface Props {
  isOpenPopup: boolean;
  setIsOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

function AuthorizationMenu({ isOpenPopup, setIsOpenPopup }: Props) {
  const supabase = createClient(
    "https://vdxfwgidxnpsnvczwizn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkeGZ3Z2lkeG5wc252Y3p3aXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMzE3OTcsImV4cCI6MjA0ODkwNzc5N30.BgQ6_BEa5M-wUwXxKFoNEFPFnJ1CEzPpx86mmYpWxr8"
  );
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

  const handleRegister = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error("Ошибка ", authError.message); /////
      return;
    }

    const { error: dbError } = await supabase
      .from("users")
      .insert([{ email, password }]);

    if (dbError) {
      console.error("Ошибка ", dbError.message);
    } else {
      alert("Регмстрация успешна");
    }
  }

  const handleLogin = async (data: { email: string; password: string }) => {
    const { email, password } = data;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Ошибка ", error.message);
    } else {
      alert("Авторизация успешна");
    }
  }

  const onSubmit = async (data: { email: string; password: string }) => {
    if (isRegister) {
      await handleRegister(data);
    } else {
      await handleLogin(data);
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
