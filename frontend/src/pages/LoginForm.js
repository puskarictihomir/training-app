import React from "react";
import { useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";

import axios from "axios";

import AuthForm from "../components/AuthForm";

const LoginForm = () => {
  const navigate = useNavigate();

  const toast = useToast();

  const handleSubmit = (username, password) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/login`, { username, password })
      .then(function (response) {
        if (response.data.statusCode === 200) {
          document.cookie = "token=" + response.data.data.token;
          navigate("/");
        } else if (response.data.statusCode === 404 || response.data.statusCode === 401) {
          toast({
            title: "Check input data.",
            description: "Wrong username or password.",
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

  return <AuthForm handleSubmit={handleSubmit} title="Log in" />;
};

export default LoginForm;
