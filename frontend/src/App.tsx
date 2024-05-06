import "./App.css";
import { AuthProvider } from "./providers/authContext";
import Router from "./router";
import { routes } from "./routes/routesConfig";

function App() {
  return (
    <AuthProvider>
      <Router routes={routes} />
    </AuthProvider>
  );
}

export default App;
