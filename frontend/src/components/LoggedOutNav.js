import { Link } from "react-router-dom";

import { Box, Grid } from "@chakra-ui/react";

const LoggedOutNav = () => {
  return (
    <Box m="50px">
      <Grid templateColumns="repeat(2, 1fr)" mb={12}>
        <Link to="/register">Registracija</Link>
        <Link to="/login">Prijava</Link>
      </Grid>
    </Box>
  );
};

export default LoggedOutNav;
