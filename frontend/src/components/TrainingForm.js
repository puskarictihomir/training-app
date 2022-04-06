import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, FormLabel, Input, FormControl, IconButton, Grid, Button, useToast, Text } from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

import axios from "axios";

import LoggedInNav from "../components/LoggedInNav";
import LoggedOutNav from "../components/LoggedOutNav";

const TrainingForm = ({ training = null, edit = false }) => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [trainingTime, setTrainingTime] = useState({ startTime: "", endTime: "" });

  useEffect(() => {
    if (training) {
      const exercisesCopy = training.exercises.map((e) => {
        return { name: e.name, reps: e.reps, sets: e.sets };
      });

      setExercises(exercisesCopy);
      setTrainingTime({ startTime: new Date(training.startTime), endTime: training.endTime });
    }
  }, [training]);

  let token = "";

  if (document.cookie) {
    token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      .split("=")[1];
  }

  const toast = useToast();

  const handleAddExercise = () => {
    setExercises([...exercises, { name: "", sets: "", reps: "" }]);
  };

  const handleDeleteExercise = (i) => {
    setExercises(exercises.filter((_, ind) => ind !== i));
  };

  const handleChange = (event, i) => {
    let newExercises = [...exercises];
    newExercises[i][event.target.name] = event.target.value;

    setExercises(newExercises);
  };

  const handleTimeChange = (event) => {
    const { name, value } = event.target;

    setTrainingTime((trainingTime) => ({
      ...trainingTime,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (exercises.filter((e) => !e.name || !e.sets || !e.reps).length || !trainingTime.startTime) {
      toast({
        title: "Missing exercise data",
        description: "To save a training, input exercise name, reps, sets i start time.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      return;
    }

    const routeEnding = edit ? `edit/${training._id}` : "create";

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/${routeEnding}`,
        { exercises, trainingTime },
        { headers: { Authorization: token } }
      )
      .then(function (response) {
        if (response.status === 200) {
          navigate("/");
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast({
            title: "Missing data.",
            description: "",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
        console.error(err);
      });
  };

  if (!token) {
    return (
      <Box>
        <LoggedOutNav />
        <Text>Sign in to see this page</Text>
      </Box>
    );
  }

  return (
    <Box>
      <LoggedInNav />
      <FormControl>
        <Box mr={4} maxW="220px" mb={4}>
          <FormLabel htmlFor="startTime">Start time</FormLabel>
          <Input
            id="startTime"
            type="datetime-local"
            name="startTime"
            value={trainingTime.startTime}
            onChange={(event) => handleTimeChange(event)}
          />
        </Box>

        <IconButton
          mb={4}
          icon={<AddIcon />}
          colorScheme="blue"
          aria-label="Add exercise"
          onClick={handleAddExercise}
        />

        <Grid templateColumns="repeat(4, 1fr)">
          {exercises.map((el, i) => {
            return (
              <Box key={i} mb={12} maxW="320px">
                <Box mb={4}>
                  <FormLabel htmlFor={`name${i}`}>Exercise name</FormLabel>
                  <Input
                    id={`name${i}`}
                    name="name"
                    type="text"
                    value={el.name}
                    onChange={(event) => handleChange(event, i)}
                  />
                </Box>
                <Box mb={4}>
                  <FormLabel htmlFor={`sets${i}`}>Sets</FormLabel>
                  <Input
                    id={`sets${i}`}
                    name="sets"
                    type="number"
                    value={el.sets}
                    onChange={(event) => handleChange(event, i)}
                  />
                </Box>
                <Box mb={4}>
                  <FormLabel htmlFor={`reps${i}`}>Reps in a set</FormLabel>
                  <Input
                    id={`reps${i}`}
                    type="number"
                    value={el.reps}
                    name="reps"
                    onChange={(event) => handleChange(event, i)}
                  />
                </Box>

                <IconButton icon={<DeleteIcon />} colorScheme="red" onClick={() => handleDeleteExercise(i)} />
              </Box>
            );
          })}
        </Grid>
        <Button isDisabled={exercises.length ? false : true} colorScheme="blue" onClick={handleSubmit}>
          Save
        </Button>
      </FormControl>
    </Box>
  );
};

export default TrainingForm;
