import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<>Hello World</>} />
        </Routes>
      </Layout>
    </Router>
  );
};
export default App;
