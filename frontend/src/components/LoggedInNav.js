import { Link } from "react-router-dom";

import { Grid } from "@chakra-ui/react";

const LoggedInNav = () => {
  const deleteToken = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)" mb={12}>
      <Link to="/">Home</Link>
      <Link to="/create">Add training</Link>
      <Link onClick={deleteToken} to="/login">
        Log out
      </Link>
    </Grid>
  );
};

export default LoggedInNav;
