import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  let routes = <AppRoutes />;

  return <Router>{routes}</Router>;
}

export default App;
