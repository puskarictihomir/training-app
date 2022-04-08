import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { Box, useToast, Spinner, Text, Button } from "@chakra-ui/react";

import axios from "axios";

import LoggedInNav from "../components/LoggedInNav";
import LoggedOutNav from "../components/LoggedOutNav";
import UserForm from "../components/UserForm";

const UserProfile = () => {
  const [user, setUser] = useState(null);
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
      .get(`${process.env.REACT_APP_BASE_URL}/api/user`, { headers: { Authorization: token } })
      .then(function (response) {
        if (response.status === 200 && response.data?.user) {
          setUser(response.data.user);
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

  return (
    <Box>
      <LoggedInNav />
      <Button mb={4}>
        <Link to="/profile/edit">Edit</Link>
      </Button>
      <UserForm user={user} detailsPage={true} />
    </Box>
  );
};

export default UserProfile;
