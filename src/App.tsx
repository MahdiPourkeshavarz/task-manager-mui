import { Provider } from "react-redux";
import { store } from "./store/store";
import TaskManager from "./components/TaskManager";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeOption } from "./styles/themeOption";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={themeOption}>
        <CssBaseline />
        <TaskManager />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
