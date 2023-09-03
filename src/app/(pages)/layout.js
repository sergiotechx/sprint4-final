"use client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Roboto } from "next/font/google";
import { ReduxProvider } from "../../store/auth/providers";
import Footer from "../../components/footer/footer";
import "./layout.scss";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400"],
});

export default function RootLayout({ children }) {
  const currentPath = usePathname();

  return (
    <html lang="es">
      <head>
        <title>Foody 🥗</title>
      </head>
      <body className={roboto.className}>
        <ReduxProvider>{children}  
        {currentPath !== "/newOrder" ? <Footer /> : ""}
        </ReduxProvider>
      </body>
    </html>
  );
}
