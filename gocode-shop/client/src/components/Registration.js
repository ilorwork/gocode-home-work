import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PasswardField from "./PasswordField";
import { Button } from "@mui/material";
import "./Registration.css";
import config from "../config.json";

export default function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser2 = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    const newUser = {
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      password: "password",
    };
    // console.log(newUser);

    await fetch(`${config.BaseUrl}/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="registration-form-container">
      <Box
        component="form"
        sx={{
          width: "60ch",
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="registration-fields-container">
          <TextField
            required
            id="outlined-required"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswardField value={password} setPassword={setPassword} />

          <Button onClick={(e) => handleSubmit(e)}>Button</Button>
        </div>
      </Box>
    </div>
  );
}
