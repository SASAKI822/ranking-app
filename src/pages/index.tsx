import { loginState, uIdState } from "@/lib/atom";
import { Inter } from "@next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  // サインチェック
  const signInCheck = useRecoilValue(loginState);
  const router = useRouter();
  useEffect(() => {
    if (signInCheck === true) {
      router.replace("movie");
    } else {
      router.replace("signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInCheck]);
};

export default Home;
