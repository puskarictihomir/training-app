import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Box, useToast, Spinner, Text } from "@chakra-ui/react";

import axios from "axios";

import LoggedInNav from "../components/LoggedInNav";
import LoggedOutNav from "../components/LoggedOutNav";

const TrainingsList = () => {
  const [trainings, setTrainings] = useState(null);

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
      .get(`${process.env.REACT_APP_BASE_URL}/api`, { headers: { Authorization: token } })
      .then(function (response) {
        if (response.status === 200 && response.data?.trainings) {
          setTrainings(response.data.trainings);
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

  if (!token) {
    return (
      <Box>
        <LoggedOutNav />
        <Text>Sign in to see this page</Text>
      </Box>
    );
  }

  if (trainings) {
    return (
      <Box>
        <LoggedInNav />
        {trainings.length ? (
          <Box>
            {trainings.map((t, i) => {
              const date = new Date(t.createdAt);
              return (
                <Box key={i}>
                  <Link to={`/details/${t._id}`}>{date.toDateString("YYYY MM DD HH mm")}</Link>
                </Box>
              );
            })}
          </Box>
        ) : (
          <Text>No saved trainings</Text>
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
