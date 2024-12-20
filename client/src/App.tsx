import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<>Hello World</>} />
      </Routes>
    </Router>
  );
};
export default App;
