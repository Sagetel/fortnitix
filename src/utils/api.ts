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
      await supabase.auth.signInWithPassword({ email, password });
      return true; 
    } catch (error) {
      console.error("Ошибка авторизации: ", error);
      throw error; 
    }
  };