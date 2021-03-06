import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Box, useToast, Spinner, Text, Flex } from "@chakra-ui/react";

import axios from "axios";

import LoggedInNav from "../components/LoggedInNav";
import LoggedOutNav from "../components/LoggedOutNav";

import TrainingForm from "../components/TrainingForm";

const EditTraining = () => {
  const { id } = useParams();
  const [training, setTraining] = useState(null);

  let token = "";

  if (document.cookie) {
    token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      .split("=")[1];
  }

  const toast = useToast();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/${id}`, { headers: { Authorization: token } })
      .then(function (response) {
        if (response.status === 200 && response.data?.training) {
          setTraining(response.data.training);
        } else {
          toast({
            title: "Something went wrong.",
            description: "",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return <TrainingForm training={training} edit={true} />;
};

export default EditTraining;
