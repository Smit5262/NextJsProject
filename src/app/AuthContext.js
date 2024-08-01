// "use client";

// import React, { createContext, useState, useEffect, useContext } from "react";
// import Cookies from "js-cookie";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const userId = Cookies.get("userId");
//     setIsLoggedIn(!!userId);
//   }, []);

//   const login = (userId) => {
//     Cookies.set("userId", userId);
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     Cookies.remove("userId");
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUserId = async () => {
      const userId = Cookies.get("userId");
      setIsLoggedIn(!!userId);

      const isValid = await checkUserIdFromCookie(userId);
      if (userId) {
        if (!isValid) {
          Cookies.remove("userId");
          setIsLoggedIn(false);
          router.push("/Login");
        } else {
          setIsLoggedIn(true);
        }
      }
    };

    checkUserId();
  }, []);

  const login = (userId) => {
    Cookies.set("userId", userId);
    setIsLoggedIn(true);
  };

  const logout = () => {
    Cookies.remove("userId");
    setIsLoggedIn(false);
    router.push("/Login");
  };

  const checkUserIdFromCookie = async (userId) => {
    try {
      const response = await fetch(`/api/verifyUserId`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      return data.isValid;
    } catch (error) {
      console.error("Error verifying user ID:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
