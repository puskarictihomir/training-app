import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TrainingForm from "./pages/TrainingForm";

import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box m="50px">
      <Router>
        <Routes>
          <Route exact path="/" element={"Log In"} />
          <Route exact path="/create" element={<TrainingForm />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
