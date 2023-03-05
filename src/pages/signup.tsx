import React, { useState } from "react";

import {
  Grid,
  Box,
  Button,
  TextField,
  Paper,
  Avatar,
  Typography,
} from "@mui/material";

import { Container } from "@mui/system";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Link from "next/link";

import { auth } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Router, { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignUp = async (e: any) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        router.push("/movie");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const provider = new GoogleAuthProvider();
  const googleRegister = async (e: any) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        router.push("/movie");
        const userObject = result.user;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
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
              <HowToRegIcon />
            </Avatar>
            <Typography variant={"h5"} sx={{ m: "30px" }} align="center">
              Register
            </Typography>
            <TextField
              label="E-mail"
              variant="standard"
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
                onClick={handleSubmit(handleSignUp)}
              >
                新規登録
              </Button>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                onClick={googleRegister}
                sx={{ display: "block", mt: "15px" }}
              >
                Google新規登録
              </Button>
              <Typography
                variant="caption"
                sx={{ display: "block", textAlign: "end", mt: 1 }}
              >
                アカウントを持っていますか？
                <Link href="/signin">SignIn</Link>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Container>
    </>
  );
};

export default SignUp;
