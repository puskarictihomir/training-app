import React, { useEffect, useState } from "react";

import { Box } from "@chakra-ui/react";

import axios from "axios";

const TrainingsList = () => {
  const [trainings, setTrainings] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:4001/api?token=${token}`)
      .then(function (response) {
        setTrainings(response.data);
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

  return "Nema spremljenih treninga";
};

export default TrainingsList;
