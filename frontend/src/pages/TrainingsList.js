import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Box, useToast, Spinner, Text, IconButton, Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import axios from "axios";

import LoggedInNav from "../components/LoggedInNav";
import LoggedOutNav from "../components/LoggedOutNav";

const TrainingsList = () => {
  const [trainings, setTrainings] = useState(null);
  const [count, setCount] = useState(null);
  const [page, setPage] = useState(1);
  const recordsPerPage = 4;

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
      .get(`${process.env.REACT_APP_BASE_URL}/api`, {
        params: {
          page,
          recordsPerPage,
        },
        headers: { Authorization: token },
      })
      .then(function (response) {
        if (response.status === 200 && response.data?.trainings) {
          setTrainings(response.data.trainings);
          setCount(response.data.count);
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
  }, [page]);

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

                <Tr>
                  <Td>
                    {
                      <Button isDisabled={page < 2} mr={4} colorScheme="blue" onClick={() => setPage(page - 1)}>
                        Back
                      </Button>
                    }
                    <Button
                      isDisabled={page === Math.ceil(count / recordsPerPage)}
                      colorScheme="blue"
                      onClick={() => setPage(page + 1)}
                    >
                      Next
                    </Button>
                  </Td>
                  <Td>
                    <Text>
                      Page {page} of {Math.ceil(count / recordsPerPage)}
                    </Text>
                  </Td>
                </Tr>
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
