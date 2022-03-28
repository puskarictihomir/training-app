import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TrainingForm from "./pages/TrainingForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={"Log In"} />
        <Route exact path="/create" element={<TrainingForm />} />
      </Routes>
    </Router>
  );
}

export default App;
