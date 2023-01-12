import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import "../stylesheets/register.css";

interface RegisterProps {
  type: "login" | "createAccount";
}
const Register = ({ type }: RegisterProps) => {
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });

  const handleUpdateInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };
  let titleAndButton;
  type === "login"
    ? (titleAndButton = "Login")
    : (titleAndButton = "Create Account");
  return (
    <Box className="form">
      <Typography variant="h6">{titleAndButton}</Typography>
      <TextField
        name="username"
        value={inputValues.username}
        label="Username"
        onChange={handleUpdateInputValues}
      ></TextField>
      <TextField
        name="password"
        value={inputValues.password}
        label="Password"
        onChange={handleUpdateInputValues}
      ></TextField>
      <Button variant="contained">{titleAndButton}</Button>
    </Box>
  );
};
export default Register;
