import React from "react";
import { useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";

import axios from "axios";

import AuthForm from "../components/AuthForm";

const RegisterForm = () => {
  const navigate = useNavigate();

  const toast = useToast();

  const handleSubmit = (username, password) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/register`, { username, password })
      .then(function (response) {
        if (response.data.statusCode === 200) {
          navigate("/login");
        } else if (response.data.statusCode === 409) {
          toast({
            title: "Username taken.",
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

  return <AuthForm handleSubmit={handleSubmit} title="Register" />;
};

export default RegisterForm;
