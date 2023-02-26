import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { loginState, uIdState } from "./atom";
import { auth } from "./firebase";

const AuthProvider = () => {
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
};

export default AuthProvider;
