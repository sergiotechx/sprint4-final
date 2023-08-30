"use client";
import React from "react";
import "./footer.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { usePathname, useRouter } from "next/navigation";

const Footer = () => {
  const currentPath = usePathname();
  const router = useRouter();

  const goRute = (page) => {
    if (page == "home") {
      router.push("/home");
    }
    if (page == "search") {
      router.push("/search");
    }
    if (page == "order") {
      router.push("/order");
    }
    if (page == "newOrder") {
      router.push("/newOrder");
    }
    if (page == "perfil") {
      router.push("/user/perfil");
    }
  };

  return (
    <div className="footerPrimary">
      <i
        className={`bi bi-house-door ${
          currentPath === "/home" ? "text-warning puntito" : ""
        }`}
        onClick={() => goRute("home")}
      ></i>
      <i
        className={`bi bi-search ${
          currentPath === "/search" ? "text-warning puntito" : ""
        }`}
        onClick={() => goRute("search")}
      ></i>
      <i
        className={`bi bi-stopwatch  ${
          currentPath === "/order" || currentPath === "/detail"
            ? "text-warning puntito"
            : ""
        }`}
        onClick={() => goRute("order")}
      ></i>
      <i
        className={`bi bi-cart-plus  ${
          currentPath === "/newOrder" ? "text-warning puntito" : ""
        }`}
        onClick={() => goRute("newOrder")}
      ></i>
      <i
        className={`bi bi-person  ${
          currentPath === "/perfil" ? "text-warning puntito" : ""
        }`}
        onClick={() => goRute("perfil")}
      ></i>
    </div>
  );
};

export default Footer;

//comentario
