import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NewTraining from "./pages/NewTraining";
import TrainingsList from "./pages/TrainingsList";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import TrainingDetails from "./pages/TrainingDetails";
import EditTraining from "./pages/EditTraining";
import UserProfile from "./pages/UserProfile";
import UserProfileEdit from "./pages/UserProfileEdit";

import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box m={12}>
      <Router>
        <Routes>
          <Route exact path="/" element={<TrainingsList />} />
          <Route exact path="/create" element={<NewTraining />} />
          <Route exact path="/register" element={<RegisterForm />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/details/:id" element={<TrainingDetails />} />
          <Route exact path="/edit/:id" element={<EditTraining />} />
          <Route exact path="/profile" element={<UserProfile />} />
          <Route exact path="/profile/edit" element={<UserProfileEdit />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
