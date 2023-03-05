import React, { useState } from "react";
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

const SignIn: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignin = async () => {
    (data: any) => console.log("onSubmit:", data);
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push("/movie");
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

  const handleGoogleSignin = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const credential: any = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      router.push("/movie");
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
                onClick={handleSubmit(handleSignin)}
              >
                ログインする
              </Button>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                onClick={handleGoogleSignin}
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
