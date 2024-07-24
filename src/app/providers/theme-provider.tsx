"use client";
import React from "react";
import { ConfigProvider } from "antd";



const ThemeProvider = ({ children }: { children: React.ReactNode }) => {

 const primaryColor = "#0B2239";
 
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColor,
          borderRadius: 2,
        },
        components: {
          Button: {
            controlHeight: 42,
            colorBorder: primaryColor,
            boxShadow: "none",
            controlOutline: "none",
          },
          Input: {
            controlHeight: 45,
            activeShadow: "none",
            colorBorder: "#ccc",
          },
          Select: {
            controlHeight: 45,
            colorBorder: "#ccc",
            boxShadow: "none",
            controlOutline: "none",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default ThemeProvider;