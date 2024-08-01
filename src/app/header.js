"use client";

import React from "react";
import styles from "./cssFiles/header.module.css";
import Link from "next/link";
import classNames from "classnames";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { IoIosLogIn, IoMdLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import Cart from "./Cart/page";

function Header() {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/Login");
  };

  return (
    <nav className={classNames("navbar", styles.navbar)}>
      <div className={classNames("container-fluid", styles.container)}>
        <Link className={classNames("navbar-brand", styles.logo)} href={"/"}>
          Shopmania
        </Link>
        <ul className={styles.navLinks}>
          <li>
            <Link href={"/Beauty"}>Beauty</Link>
          </li>
          <li>
            <Link href="/Books">Books</Link>
          </li>
          <li>
            <Link href={"/Health"}>Health</Link>
          </li>
          <li>
            <Link href={"/Mobile"}>Mobile</Link>
          </li>
          <li>
            <Link href={"/T-shirts"}>T-Shirts</Link>
          </li>
          <li>
            <Link href={"/Toys"}>Toys</Link>
          </li>
          <li>
            <Link href={"/Contact"}>Contact</Link>
          </li>
          <li>
            <Link href={"/About"}>About</Link>
          </li>
        </ul>
        <div className={styles.icons}>
          <div className={styles.accountIcon}>
            <Link href={"/Account"}>
              <MdAccountCircle className={styles.icon} />
            </Link>
          </div>
          {isLoggedIn ? (
            <IoMdLogOut className={styles.icon} onClick={handleLogout} />
          ) : (
            <Link href={"/Login"}>
              <IoIosLogIn className={styles.icon} />
              Login
            </Link>
          )}
          <Link href={"/Cart"}>
            <FaShoppingCart className={styles.icon} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;