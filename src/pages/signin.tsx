import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Button, TextField } from "@mui/material";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";
import Link from "next/link";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";
import { useState } from "react";

type InputValue = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputValue>();

  /**
   * メールアドレスとパスワードでログインする
   */
  const handleSignIn = async (data: InputValue) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        router.push("/movie");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Googleログインする
   */
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const credential: any = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      router.push("/movie");
    });
  };

  /**
   * ゲストログインする
   */
  const handleGuestSignIn = async () => {
    await signInWithEmailAndPassword(auth, "test@test.com", "123123")
      .then(() => {
        router.push("/movie");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Container>
        <Grid container>
          <Paper
            elevation={10}
            sx={{
              padding: 12,
              "@media screen and (max-width:600px)": {
                paddingLeft: 3,
                paddingRight: 3,
              },
              m: "60px auto",
              maxWidth: "450px",
            }}
          >
            <Avatar sx={{ m: "0 auto", bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant={"h5"} sx={{ m: "30px" }} align="center">
              SignIn
            </Typography>

            <TextField
              label="E-mail"
              variant="standard" // border無しになる
              sx={{ mt: "5px" }}
              fullWidth
              id="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <div style={{ color: "red" }}>※入力が必須の項目です</div>
            )}
            <TextField
              sx={{ mt: "5px" }}
              label="Password"
              type="password"
              variant="standard"
              fullWidth
              id="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <div style={{ color: "red" }}>※入力が必須の項目です</div>
            )}
            <Box mt={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                onClick={() => handleGuestSignIn()}
              >
                ゲストでログイン
              </Button>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                onClick={handleSubmit(handleSignIn)}
                sx={{ display: "block", mt: "15px" }}
              >
                ログインする
              </Button>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                onClick={handleGoogleSignIn}
                sx={{ display: "block", mt: "15px" }}
              >
                Googleでログイン
              </Button>
              <Grid item xs>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    textAlign: "end",
                    mt: 2,
                    textDecoration: "underline",
                    color: "#1976d2",
                  }}
                >
                  <Link href={"signup"}>アカウントを登録する</Link>
                </Typography>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Container>
    </>
  );
};

export default SignIn;
