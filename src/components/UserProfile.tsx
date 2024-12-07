import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

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
    <div
      onClick={() => {
        getUser();
      }}
    >
      {email}
    </div>
  );
}

export default UserProfile;
