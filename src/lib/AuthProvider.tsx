import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, createContext, useContext } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  loginState,
  RegisterActorListState,
  uIdState,
  WatchListState,
} from "./atom";
import { auth, db } from "./firebase";

const AuthContext = createContext<any | undefined>(undefined);

export function useAuthContext() {
  return useContext(AuthContext);
}
const AuthProvider = ({ children }: any) => {
  // ユーザーid
  const [userId, setUserId] = useRecoilState(uIdState);

  // サインインチェック
  const [signInCheck, setSignInCheck] = useRecoilState(loginState);

  const setRegisterActorList = useSetRecoilState(RegisterActorListState);

  // 見る映画リスト
  const setWatchList = useSetRecoilState(WatchListState);

  // サインインチェック関数
  useEffect(() => {
    async function fetchData() {
      const actorsRef = query(collection(db, "users", userId, "actors"));

      await getDocs(actorsRef).then((querySnapshot) => {
        setRegisterActorList(
          querySnapshot.docs.map((doc) => ({ ...doc.data() }))
        );
      });

      const moviesRef = query(collection(db, "users", userId, "movies"));

      await getDocs(moviesRef).then((querySnapshot) => {
        setWatchList(querySnapshot.docs.map((doc) => ({ ...doc.data() })));
      });
    }

    const unsubscribed = auth.onAuthStateChanged((user: any) => {
      if (user) {
        setSignInCheck(true);
        setUserId(user.uid);
        fetchData();
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
