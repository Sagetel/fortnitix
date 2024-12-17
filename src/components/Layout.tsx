import React, { useEffect } from "react";
import Header from "./Header";
import { fetchShopAsync } from "../store/action-creators/skins";
import { useAppDispatch } from "../store/hooks";


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {    
    dispatch(fetchShopAsync());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <main style={{ padding: "20px", height: '100%' }}>{children}</main>
    </div>
  );
};

export default Layout;
