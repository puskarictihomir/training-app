import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, FormLabel, Input, FormControl, Button, Center } from "@chakra-ui/react";

import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  const sumbmitDiasbled = formData.username.length && formData.password.length ? false : true;

  const handleSubmit = () => {
    axios
      .post("http://localhost:4001/api/register", formData)
      .then(function (response) {
        if (response.data.statusCode === 200) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
      });

    setFormData({ username: "", password: "" });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  return (
    <Center textAlign="center">
      <FormControl maxW="500px">
        <Box mb={4}>
          <FormLabel textAlign="center" htmlFor="username">
            Korisničko ime
          </FormLabel>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={(event) => handleChange(event)}
          />
        </Box>
        <Box mb={4}>
          <FormLabel textAlign="center" htmlFor="password">
            Lozinka
          </FormLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={(event) => handleChange(event)}
          />
        </Box>

        <Button isDisabled={sumbmitDiasbled} colorScheme="blue" onClick={handleSubmit}>
          Spremi
        </Button>
      </FormControl>
    </Center>
  );
};

export default RegisterForm;
