import { Link } from "react-router-dom";

import { Box, Grid } from "@chakra-ui/react";

const LoggedOutNav = () => {
  return (
    <Box m="50px">
      <Grid templateColumns="repeat(2, 1fr)" mb={12}>
        <Link to="/register">Register</Link>
        <Link to="/login">Log in</Link>
      </Grid>
    </Box>
  );
};

export default LoggedOutNav;
