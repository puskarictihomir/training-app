import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, FormLabel, Input, FormControl, Button, Center, useToast, Heading } from "@chakra-ui/react";

import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  const toast = useToast();

  const sumbmitDiasbled = formData.username.length && formData.password.length ? false : true;

  const handleSubmit = () => {
    axios
      .post("http://localhost:4001/api/register", formData)
      .then(function (response) {
        if (response.data.statusCode === 200) {
          navigate("/login");
        } else if (response.data.statusCode === 409) {
          toast({
            title: "Korisničko ime zauzeto.",
            description: "",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  return (
    <Center flexDirection="column" textAlign="center">
      <Heading mb={12} display="block">
        Registracija
      </Heading>
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
