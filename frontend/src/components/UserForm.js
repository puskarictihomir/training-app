import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { Box, useToast, Button, Input, FormLabel, Image } from "@chakra-ui/react";

import axios from "axios";

import dayjs from "dayjs";

const UserForm = ({ user, detailsPage = false }) => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (user?.fullName) {
      setFullName(user.fullName);
    }

    if (user?.dateOfBirth) {
      const date = new Date(user.dateOfBirth);

      const formatedDate = dayjs(date).format("YYYY-MM-DD");

      setDateOfBirth(formatedDate);
    }

    if (user?.image) {
      setProfileImage(user.image);
    }
  }, [user]);

  let token = "";

  if (document.cookie) {
    token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      .split("=")[1];
  }

  const toast = useToast();

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    var formData = new FormData();

    formData.append("fullName", fullName);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("profileImage", profileImage);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/user/edit`,
      data: formData,
      headers: { Authorization: token, "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        if (response.status === 200) {
          navigate("/profile");
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

  return (
    <Box maxW="500px">
      {!detailsPage ? (
        <Box mb={4}>
          <FormLabel htmlFor="profileImage">Image</FormLabel>
          <Input
            id="profileImage"
            name="profileImage"
            type="file"
            onChange={(event) => handleImageChange(event)}
            isDisabled={detailsPage ? true : false}
          />
        </Box>
      ) : (
        <Image src={profileImage ? require(`../../../public/images/${profileImage}`) : ""} />
      )}
      <Box mb={4}>
        <FormLabel htmlFor="fullName">Full name</FormLabel>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          value={fullName}
          onChange={(event) => handleFullNameChange(event)}
          isDisabled={detailsPage ? true : false}
        />
      </Box>
      <Box mb={4}>
        <FormLabel htmlFor="dateOfBirth">Date of birth</FormLabel>
        <Input
          id="dateOfBirth"
          type="date"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={(event) => handleBirthChange(event)}
          isDisabled={detailsPage ? true : false}
        />
      </Box>
      <Button isDisabled={detailsPage} colorScheme="blue" onClick={handleSubmit}>
        Save
      </Button>
    </Box>
  );
};

export default UserForm;
