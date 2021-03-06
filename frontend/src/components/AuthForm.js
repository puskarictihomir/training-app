import React, { useState } from "react";

import { Box, FormLabel, Input, FormControl, Button, Center, Heading } from "@chakra-ui/react";

import LoggedOutNav from "./LoggedOutNav";

const AuthForm = ({ handleSubmit, title }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const sumbmitDiasbled = username && password ? false : true;

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "username") {
      setUsername(value);
    }

    if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <Box>
      <LoggedOutNav />
      <Center flexDirection="column" textAlign="center">
        <Heading mb={12} display="block">
          {title}
        </Heading>
        <FormControl maxW="500px">
          <Box mb={4}>
            <FormLabel textAlign="center" htmlFor="username">
              Username
            </FormLabel>
            <Input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(event) => handleChange(event)}
            />
          </Box>
          <Box mb={4}>
            <FormLabel textAlign="center" htmlFor="password">
              Password
            </FormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => handleChange(event)}
            />
          </Box>

          <Button isDisabled={sumbmitDiasbled} colorScheme="blue" onClick={() => handleSubmit(username, password)}>
            {title}
          </Button>
        </FormControl>
      </Center>
    </Box>
  );
};

export default AuthForm;
