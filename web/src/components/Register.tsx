import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { createNewAccount, loginUser } from "../api/users";
import "../stylesheets/register.css";
import { CreateUserOrLogin } from "../types";
import theme from "../theme";

interface RegisterProps {
  type: "login" | "createAccount";
}
const Register = ({ type }: RegisterProps) => {
  const [inputValues, setInputValues] = useState<CreateUserOrLogin>({
    username: "",
    plainPassword: "",
  });

  const handleUpdateInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleSubmitButton = () => {
    type === "login" ? loginUser(inputValues) : createNewAccount(inputValues);
  };

  let titleAndButton;
  type === "login"
    ? (titleAndButton = "Login")
    : (titleAndButton = "Create Account");
  return (
    <Box
      className="form-container"
      sx={{ [theme.breakpoints.down("md")]: { height: "80%", width: "80%" } }}
    >
      <Box className="form">
        <Typography variant="h6">{titleAndButton}</Typography>
        <TextField
          name="username"
          value={inputValues.username}
          label="Username"
          onChange={handleUpdateInputValues}
        ></TextField>
        <TextField
          name="plainPassword"
          type="password"
          value={inputValues.plainPassword}
          label="Password"
          onChange={handleUpdateInputValues}
        ></TextField>
        <Button variant="contained" onClick={handleSubmitButton}>
          {titleAndButton}
        </Button>
      </Box>
    </Box>
  );
};
export default Register;
