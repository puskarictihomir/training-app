import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import TrainingForm from "./pages/TrainingForm";
import TrainingsList from "./pages/TrainingsList";

import { Box, Grid } from "@chakra-ui/react";

function App() {
  return (
    <Box m="50px">
      <Router>
        <Grid templateColumns="repeat(4, 1fr)" mb={12}>
          <Link to="/">Početna</Link>
          <Link to="/create">Kreiraj trening</Link>
        </Grid>
        <Routes>
          <Route exact path="/" element={<TrainingsList />} />
          <Route exact path="/create" element={<TrainingForm />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
