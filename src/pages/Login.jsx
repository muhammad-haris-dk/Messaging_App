import { Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import Input from "../components/Input";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase_config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { conditional_Public_Private } from "../store/Slice";

const Login = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate()

  const onSubmit_Handle = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("isloggedin" ,true)
        navigate("/")
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className="h-[100dvh] flex justify-center items-center">
      <Paper sx={{ padding: "25px" }} elevation={3}>
        <form onSubmit={onSubmit_Handle}>
          <div>
            <Input
              placeholder="Email Address"
              type="email"
              id="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required={true}
            />
          </div>
          <br />
          <div>
            <Input
              placeholder="Password"
              type="password"
              id="password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required={true}
            />
          </div>
          <br />
          <div>
            <Button
              type="submit"
              className="px-2 py-3 w-full bg-green-800 focus:bg-green-900 rounded-md text-white"
            >
              Login
            </Button>
          </div>
          <br />
          <div className="flex justify-center items-center">
            <Typography>
              Create an Account?{" "}
              <Link
                className="hover:underline focus:text-green-600"
                to="/signup"
              >
                Signup
              </Link>
            </Typography>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
