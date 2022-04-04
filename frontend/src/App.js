import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TrainingForm from "./pages/TrainingForm";
import TrainingsList from "./pages/TrainingsList";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import TrainingDetails from "./pages/TrainingDetails";

import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box m={12}>
      <Router>
        <Routes>
          <Route exact path="/" element={<TrainingsList />} />
          <Route exact path="/create" element={<TrainingForm />} />
          <Route exact path="/register" element={<RegisterForm />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/details/:id" element={<TrainingDetails />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
