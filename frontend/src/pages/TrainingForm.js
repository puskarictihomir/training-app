import React, { useState } from "react";

import { Box, FormLabel, Input, FormControl, IconButton, Grid, Button, Flex } from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

import axios from "axios";

const TrainingForm = () => {
  const [formData, setFormData] = useState([]);
  const [time, setTime] = useState({ startTime: "", endTime: "" });

  const token = localStorage.getItem("token");

  const handleAddExercise = () => {
    setFormData([...formData, { name: "", sets: "", reps: "" }]);
  };

  const handleDeleteExercise = (i) => {
    setFormData(formData.filter((_, ind) => ind !== i));
  };

  const handleChange = (event, i) => {
    let newFormData = [...formData];
    newFormData[i][event.target.name] = event.target.value;

    setFormData(newFormData);
  };

  const handleTimeChange = (event) => {
    const { name, value } = event.target;

    setTime((time) => ({
      ...time,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    axios.post(`http://localhost:4001/api/create?token=${token}`, { formData, time }).catch((err) => {
      console.error(err);
    });

    setFormData([]);
  };

  return (
    <FormControl>
      <Flex>
        <Box mr={4} maxW="220px" mb={4}>
          <FormLabel htmlFor="startTime">Vrijeme početka</FormLabel>
          <Input
            id="startTime"
            type="time"
            name="startTime"
            value={time.startTime}
            onChange={(event) => handleTimeChange(event)}
          />
        </Box>
        <Box maxW="220px" mb={4}>
          <FormLabel htmlFor="endTime">Vrijeme završetka</FormLabel>
          <Input
            id="endTime"
            type="time"
            name="endTime"
            value={time.endTime}
            onChange={(event) => handleTimeChange(event)}
          />
        </Box>
      </Flex>
      <IconButton mb={4} icon={<AddIcon />} colorScheme="blue" aria-label="Dodaj vježbu" onClick={handleAddExercise} />

      <Grid templateColumns="repeat(4, 1fr)">
        {formData.map((el, i) => {
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
      <Button isDisabled={formData.length ? false : true} colorScheme="blue" onClick={handleSubmit}>
        Spremi
      </Button>
    </FormControl>
  );
};

export default TrainingForm;
