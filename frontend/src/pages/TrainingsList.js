import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Box, useToast, Spinner, Text, IconButton, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

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

  const navigate = useNavigate();

  const handleDeleteExercise = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/api/remove`, {
        headers: { Authorization: token },
        data: { id },
      })
      .then((response) => {
        setTrainings(trainings.filter((t) => t._id !== response.data.id));
        return response.data;
      })
      .catch((err) => console.log(err.message));
  };

  const handleEditExercise = (id) => {
    navigate(`/edit/${id}`);
  };

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
            <Table>
              <Thead>
                <Tr>
                  <Th>Training date</Th>
                  <Th>Options</Th>
                </Tr>
              </Thead>
              <Tbody>
                {trainings.map((t, i) => {
                  const date = new Date(t.createdAt);
                  return (
                    <Tr key={i}>
                      <Td>
                        <Link to={`/details/${t._id}`}>{date.toDateString("YYYY MM DD HH mm")}</Link>
                      </Td>
                      <Td>
                        <IconButton
                          mr={2}
                          icon={<EditIcon />}
                          colorScheme="blue"
                          onClick={() => handleEditExercise(t._id)}
                        />
                        <IconButton
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          onClick={() => handleDeleteExercise(t._id)}
                        />
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
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
