import { CssBaseline } from "@mui/material";
import CategoryFeed from "./scenes/CategoryFeed";
import TodoFeed from "./scenes/TodoFeed";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <h1>App Component</h1>
      <TodoFeed />
      <CategoryFeed />
    </div>
  );
}

export default App;
