import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { Box, useToast, Spinner, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

import axios from "axios";

import LoggedInNav from "../components/LoggedInNav";
import LoggedOutNav from "../components/LoggedOutNav";

const TrainingDetails = () => {
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

  if (!token) {
    return (
      <Box>
        <LoggedOutNav />
        <Text>Sign in to see this page</Text>
      </Box>
    );
  }

  if (training) {
    const startTimeMiliseconds = training.startTime; // get your number
    const startTime = new Date(startTimeMiliseconds).toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });

    const endTimeMiliseconds = training.endTime; // get your number
    const endTime = new Date(endTimeMiliseconds).toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <Box>
        <LoggedInNav />
        <Box mb={4}>
          <Text>
            Training duration: {startTime} - {endTime}
          </Text>
        </Box>
        <Table>
          <Thead>
            <Tr>
              <Th>Exercise name</Th>
              <Th>Sets</Th>
              <Th>Reps</Th>
            </Tr>
          </Thead>
          <Tbody>
            {training.exercises?.map((e, i) => {
              return (
                <Tr key={i}>
                  <Td>{e.name}</Td>
                  <Td>{e.sets}</Td>
                  <Td>{e.reps}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
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

export default TrainingDetails;
