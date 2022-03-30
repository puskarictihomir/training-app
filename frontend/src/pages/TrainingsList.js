import React, { useEffect, useState } from "react";

import { Box, useToast, Spinner } from "@chakra-ui/react";

import axios from "axios";

const TrainingsList = () => {
  const [trainings, setTrainings] = useState(null);

  const toast = useToast();

  const token = localStorage.getItem("token");

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

  if (trainings?.length) {
    return (
      <Box>
        {trainings.map((t, i) => {
          return <Box key={i}>{t._id}</Box>;
        })}
      </Box>
    );
  }

  if (trainings && trainings.length === 0) {
    return "Nema spremljenih treninga";
  }

  return <Spinner />;
};

export default TrainingsList;
