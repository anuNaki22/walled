import "./App.css";
import Profile from "./components/Profile";
import TableTransactions from "./components/TableTransactions";
// import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    // <ThemeProvider>
    <main>
      <Profile />
      <TableTransactions />
    </main>
    // </ThemeProvider>
  );
}

export default App;
