import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import TrainingForm from "./pages/TrainingForm";
import TrainingsList from "./pages/TrainingsList";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";

import { Box, Grid } from "@chakra-ui/react";

function App() {
  const token = localStorage.getItem("token");

  const deleteToken = () => {
    localStorage.removeItem("token");
  };

  return (
    <Box m="50px">
      <Router>
        <Grid templateColumns="repeat(4, 1fr)" mb={12}>
          {token && <Link to="/">Početna</Link>}
          {token && <Link to="/create">Kreiraj trening</Link>}
          {!token && <Link to="/register">Registracija</Link>}
          {!token && <Link to="/login">Prijava</Link>}
          {token && (
            <Link onClick={deleteToken} to="/login">
              Odjava
            </Link>
          )}
        </Grid>
        <Routes>
          <Route exact path="/" element={<TrainingsList />} />
          <Route exact path="/create" element={<TrainingForm />} />
          <Route exact path="/register" element={<RegisterForm />} />
          <Route exact path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
