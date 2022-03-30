import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, FormLabel, Input, FormControl, IconButton, Grid, Button, Flex, useToast } from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

import axios from "axios";

const TrainingForm = () => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [trainingTime, setTrainingTime] = useState({ startTime: "", endTime: "" });

  const token = localStorage.getItem("token");

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
        title: "Nedostaju podaci o vježbi",
        description: "Da bi ste spremili trening, unesite ime vježbe, broj setova, broj ponavljanja i vrijeme početka.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      return;
    }

    axios
      .post(`http://localhost:4001/api/create`, { exercises, trainingTime }, { headers: { Authorization: token } })
      .then(function (response) {
        console.log("response", response);
        if (response.data.statusCode === 200) {
          navigate("/");
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
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <FormControl>
      <Box mr={4} maxW="220px" mb={4}>
        <FormLabel htmlFor="startTime">Vrijeme početka</FormLabel>
        <Input
          id="startTime"
          type="datetime-local"
          name="startTime"
          value={trainingTime.startTime}
          onChange={(event) => handleTimeChange(event)}
        />
      </Box>

      <IconButton mb={4} icon={<AddIcon />} colorScheme="blue" aria-label="Dodaj vježbu" onClick={handleAddExercise} />

      <Grid templateColumns="repeat(4, 1fr)">
        {exercises.map((el, i) => {
          return (
            <Box key={i} mb={12} maxW="320px">
              <Box mb={4}>
                <FormLabel htmlFor={`name${i}`}>Ime vježbe</FormLabel>
                <Input
                  id={`name${i}`}
                  name="name"
                  type="text"
                  value={el.name}
                  onChange={(event) => handleChange(event, i)}
                />
              </Box>
              <Box mb={4}>
                <FormLabel htmlFor={`sets${i}`}>Broj setova</FormLabel>
                <Input
                  id={`sets${i}`}
                  name="sets"
                  type="number"
                  value={el.sets}
                  onChange={(event) => handleChange(event, i)}
                />
              </Box>
              <Box mb={4}>
                <FormLabel htmlFor={`reps${i}`}>Broj ponavljanja u setu</FormLabel>
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
        Spremi
      </Button>
    </FormControl>
  );
};

export default TrainingForm;
