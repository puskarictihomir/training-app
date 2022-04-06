import { Link } from "react-router-dom";

import { Box } from "@chakra-ui/react";

const LoggedOutNav = () => {
  return (
    <Box textAlign="right" m="50px">
      <Box display="inline" mr={8}>
        <Link to="/register">Register</Link>
      </Box>
      <Box display="inline">
        <Link to="/login">Log in</Link>
      </Box>
    </Box>
  );
};

export default LoggedOutNav;
