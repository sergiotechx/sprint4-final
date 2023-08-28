'use client'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Roboto } from "next/font/google";
import { ReduxProvider } from "../../store/auth/providers";
import Footer from "@/components/footer/footer";
import "./layout.scss";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400"],
});



export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <title>Foody 🥗</title>
      </head>
      <body className={roboto.className}>
        <ReduxProvider>{children}</ReduxProvider>
        <Footer />
      </body>
    </html>
  );
}
