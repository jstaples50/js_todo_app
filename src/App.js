import { CssBaseline } from "@mui/material";
import CategoryFeed from "./scenes/CategoryFeed";
import TodoFeed from "./scenes/TodoFeed";
import { useState, useEffect } from "react";

import { getCategoriesFromLocalStorage } from "./helper/localStorage";

function App() {
  const [categoryArray, setCategoryArray] = useState([]);

  useEffect(() => {
    setCategoryArray(getCategoriesFromLocalStorage());
  }, []);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <h1>JS TODOS!</h1>
      <TodoFeed
        categoryArray={categoryArray}
        setCategoryArray={setCategoryArray}
      />
      <CategoryFeed
        categoryArray={categoryArray}
        setCategoryArray={setCategoryArray}
      />
    </div>
  );
}

export default App;
