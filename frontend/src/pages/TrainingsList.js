import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, useToast, Spinner, Text } from "@chakra-ui/react";

import axios from "axios";

import LoggedInNav from "../components/LoggedInNav";

const TrainingsList = () => {
  const [trainings, setTrainings] = useState(null);

  const navigate = useNavigate();

  const toast = useToast();

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api`, { headers: { Authorization: token } })
      .then(function (response) {
        if (response.data.statusCode === 200) {
          setTrainings(response.data.trainings);
        } else {
          toast({
            title: "Nešto je pošlo po zlu.",
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

  if (trainings) {
    return (
      <Box>
        <LoggedInNav />
        {trainings.length ? (
          <Box>
            {trainings.map((t, i) => {
              return <Box key={i}>{t._id}</Box>;
            })}
          </Box>
        ) : (
          <Text>Nema spremljenih treninga</Text>
        )}
      </Box>
    );
  }

  return (
    <Box>
      <LoggedInNav />
      <Spinner />
    </Box>
  );
};

export default TrainingsList;
