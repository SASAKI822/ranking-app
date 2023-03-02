import React, { useEffect, createContext, useContext } from "react";
import { useRecoilState } from "recoil";
import { loginState, uIdState } from "./atom";
import { auth } from "./firebase";

const AuthContext = createContext<any | undefined>(undefined);

export function useAuthContext() {
  return useContext(AuthContext);
}
const AuthProvider = ({ children }: any) => {
  const [userId, setUserId] = useRecoilState(uIdState);
  const [signInCheck, setSignInCheck] = useRecoilState(loginState);

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user: any) => {
      if (user) {
        setSignInCheck(true);
        setUserId(user.uid);
      } else {
        setSignInCheck(false);
      }
    });

    return () => {
      unsubscribed();
    };
  }, [setUserId, setSignInCheck]);
  return (
    <AuthContext.Provider value={{ userId, signInCheck }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
