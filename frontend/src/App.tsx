import "./App.css";
import Router from "./router";
import { routes } from "./routes/routesConfig";

function App() {
  return (
    <Router routes={routes} />
  );
}

export default App;
