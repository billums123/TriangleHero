import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { createNewAccount, loginUser } from "../api/usersApi";
import "../stylesheets/register.css";
import { CreateUserOrLogin } from "../types";
import theme from "../theme";
import { UserContext } from "../App";

interface RegisterProps {
  type: "login" | "createAccount";
}
const Register = ({ type }: RegisterProps) => {
  const [submissionResponse, setSubmissionResponse] = useState<any>(null);
  const { user, setUser } = useContext(UserContext);
  const [inputValues, setInputValues] = useState<CreateUserOrLogin>({
    username: "",
    plainPassword: "",
  });

  // useEffect(() => {
  //   if (submissionResponse.userId) setInputValues(submissionResponse);
  // }, [submissionResponse]);

  const handleUpdateInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleSubmitButton = async () => {
    if (type === "login") {
      const loginResponse = await loginUser(inputValues);
      setUser(loginResponse);
    } else {
      setSubmissionResponse(createNewAccount(inputValues));
    }
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
