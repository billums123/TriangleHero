import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createNewAccount, loginUser } from "../api/usersApi";
import "../stylesheets/register.css";
import { CreateUserOrLogin } from "../types";
import theme from "../theme";
import { UserContext } from "../App";

interface RegisterProps {
  type: "login" | "createAccount";
}
const Register = ({ type }: RegisterProps) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [invalidInputs, setInvalidInputs] = useState(false);
  const [inputValues, setInputValues] = useState<CreateUserOrLogin>({
    username: "",
    plainPassword: "",
  });

  const handleUpdateInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 16) {
      setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    }
  };

  const handleSubmitButton = async () => {
    let response;
    if (type === "login") {
      response = await loginUser(inputValues);
    } else {
      response = await createNewAccount(inputValues);
    }
    if (response.userId) {
      setUser(response);
      setInvalidInputs(false);
      navigate("/");
    } else {
      setInvalidInputs(true);
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
        {invalidInputs && (
          <Typography variant="body2" color="error">
            Incorrect username and/or password
          </Typography>
        )}
        <TextField
          name="username"
          error={invalidInputs}
          value={inputValues.username}
          label="Username"
          onChange={handleUpdateInputValues}
        ></TextField>
        <TextField
          name="plainPassword"
          error={invalidInputs}
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
