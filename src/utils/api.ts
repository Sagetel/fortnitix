import { supabase } from "../components/supabaseClient";

export const handleRegister = async (data: { email: string; password: string }) => {
    try {
      const { email, password } = data;
      await supabase.auth.signUp({ email, password });
      return true; 
    } catch (error) {
      console.error("Ошибка регистрации: ", error);
      throw error; 
    }
  };
  
  export const handleLogin = async (dataAuth: { email: string; password: string }) => {
    try {
      const { email, password } = dataAuth;
      const { data } = await supabase.auth.signInWithPassword({ email, password });

      if (!data.user || !data.user.email) {
        throw new Error("Email пользователя не найден");
      }
      
      return data.user.email; 
    } catch (error) {
      console.error("Ошибка авторизации: ", error);
      throw error; 
    }
  };