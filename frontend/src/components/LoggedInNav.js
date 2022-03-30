import { Link } from "react-router-dom";

import { Grid } from "@chakra-ui/react";

const LoggedInNav = () => {
  const deleteToken = () => {
    localStorage.removeItem("token");
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)" mb={12}>
      <Link to="/">Početna</Link>
      <Link to="/create">Kreiraj trening</Link>
      <Link onClick={deleteToken} to="/login">
        Odjava
      </Link>
    </Grid>
  );
};

export default LoggedInNav;
