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
        if (response.status === 200) {
          if (response.data.error) {
            toast({
              title: "Check input data.",
              description: "Wrong username or password.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          } else {
            document.cookie = "token=" + response.data.token;
            navigate("/");
          }
        }
      })
      .catch((err) => {
        if (err.response.status === 401 || err.response.status === 404) {
          toast({
            title: err.response.data.error,
            description: "",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
        console.error(err.response);
      });
  };

  return <AuthForm handleSubmit={handleSubmit} title="Log in" />;
};

export default LoginForm;
