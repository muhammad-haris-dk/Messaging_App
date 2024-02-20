import { Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import Input from "../components/Input";
import { Button } from "../components/Button";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase_config";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { conditional_Public_Private } from "../store/Slice";

const Signup = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const onSubmit_Handle = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/login")
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
              placeholder="Firstname"
              type="text"
              onChange={(e) => setData({ ...data, firstname: e.target.value })}
              required={true}
            />
          </div>
          <br />
          <div>
            <Input
              placeholder="LastName"
              type="text"
              onChange={(e) => setData({ ...data, lastname: e.target.value })}
              required={true}
            />
          </div>
          <br />
          <div>
            <Input
              placeholder="Email Address"
              type="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required={true}
            />
          </div>
          <br />
          <div>
            <Input
              placeholder="Password"
              type="password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required={true}
            />
          </div>
          <br />
          <div>
            <Button
              type="submit"
              className="w-full px-2 py-2 bg-green-800 rounded-md text-white"
            >
              SignUp
            </Button>
          </div>
          <br />
          <div className="w-full flex justify-center items-center">
            <Typography>Already have an account? <Link className="hover:underline focus:text-green-700" to='/login'>Login</Link></Typography>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default Signup;
