import { ThemeModeScript } from "flowbite-react";
import "../../styles/globals.css";
const layoutLogin = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head>
        <ThemeModeScript />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default layoutLogin;
