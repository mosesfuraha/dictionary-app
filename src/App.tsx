
import { ThemeProvider } from "./context/ThemeContext";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
