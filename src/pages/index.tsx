import { loginState, uIdState } from "@/lib/atom";
import { Inter } from "@next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const [signInCheck, setSignInCheck] = useRecoilState(loginState);
  const router = useRouter();
  useEffect(() => {
    if (signInCheck === true) {
      router.replace("movie");
    } else {
      router.replace("signin");
    }
  }, [signInCheck]);
};

export default Home;
