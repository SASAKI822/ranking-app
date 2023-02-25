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
import { app } from "../lib/firebase";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Router, { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async (e: any) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        router.push("/mypage");
      })
      .catch((error) => {
        console.error(error);
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
          <Paper elevation={10} sx={{ p: 4, m: "80px auto", height: "70vh" }}>
            <Avatar sx={{ m: "20px auto", bgcolor: "primary.main" }}>
              <HowToRegIcon />
            </Avatar>
            <Typography variant={"h5"} sx={{ m: "30px" }} align="center">
              Register
            </Typography>

            <TextField
              name="email"
              label="E-mail"
              variant="standard"
              sx={{ mt: "5px" }}
              fullWidth
              value={email}
              onChange={handleChangeEmail}
            />

            <TextField
              sx={{ mt: "5px" }}
              name="password"
              label="Password"
              type="password"
              variant="standard"
              fullWidth
              value={password}
              onChange={handleChangePassword}
            />

            <Box mt={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                onClick={handleRegister}
              >
                新規登録
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
