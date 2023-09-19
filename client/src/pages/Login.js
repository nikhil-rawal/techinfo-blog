import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email: input.email,
        password: input.password,
      });
      if (data.success) {
        console.log(data);
        localStorage.setItem("userID", data?.user._id);
        dispatch(authActions.login());
        alert("User Login Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={5}
          boxShadow={"1px 1px 5px #CCC"}
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign={"center"}
          >
            Login
          </Typography>
          <TextField
            placeholder="Email"
            name="email"
            value={input.email}
            onChange={handleChange}
            margin="normal"
            type="email"
            required
          />
          <TextField
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={handleChange}
            margin="normal"
            type="password"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/register")}
            type="submit"
            color="primary"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Not a User? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};
export default Login;
