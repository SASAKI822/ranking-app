import React, { createContext, useState, useContext, useEffect } from "react";
import { useRecoilState } from "recoil";
import { loginState } from "./atom";
import { auth } from "./firebase";

// type AuthContextProps = {
//   currentUser: user | null | undefined;
//   signInInCheck: boolean;
// };

const AuthContext: any = createContext();
export function useAuthContext() {
  return useContext(AuthContext);
}
const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState("");
  const [signInCheck, setSignInCheck] = useRecoilState(loginState);
  const value = {
    user,
  };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user: any) => {
      if (user) {
        setSignInCheck(true);
        setUser(user);
      } else {
        setSignInCheck(false);
      }
    });
    return () => {
      unsubscribed();
    };
  }, []);
  console.log(signInCheck);
  return (
    <AuthContext.Provider value={signInCheck}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
