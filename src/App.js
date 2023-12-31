import { CssBaseline, Box } from "@mui/material";
import CategoryFeed from "./scenes/CategoryFeed";
import TodoFeed from "./scenes/TodoFeed";
import { useState, useEffect } from "react";

import { getCategoriesFromLocalStorage } from "./helper/localStorage";
import { getAllCategoryStrings } from "./helper/helperFunctions";

function App() {
  const [categoryArray, setCategoryArray] = useState([]);
  const [categoriesToShow, setCategoriesToShow] = useState(categoryArray);
  const [categoriesDataSets, setCategoriesDataSets] = useState([]);
  // This state is used to rerender page when a state is changed on the global level
  const [childChange, setChildChange] = useState(false);

  useEffect(() => {
    setCategoryArray(getCategoriesFromLocalStorage());
    setCategoriesToShow(getCategoriesFromLocalStorage());
    setCategoriesDataSets(
      getAllCategoryStrings(getCategoriesFromLocalStorage())
    );
  }, []);

  return (
    <div
      className="App"
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <h1>JS TODOS!</h1>
      <Box
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <TodoFeed
          categoryArray={categoryArray}
          setCategoryArray={setCategoryArray}
          categoriesToShow={categoriesToShow}
          childChange={childChange}
          setChildChange={setChildChange}
          categoriesDataSets={categoriesDataSets}
          setCategoriesDataSets={setCategoriesDataSets}
        />
        <CategoryFeed
          categoryArray={categoryArray}
          setCategoryArray={setCategoryArray}
          categoriesToShow={categoriesToShow}
          setCategoriesToShow={setCategoriesToShow}
          childChange={childChange}
          setChildChange={setChildChange}
          categoriesDataSets={categoriesDataSets}
          setCategoriesDataSets={setCategoriesDataSets}
        />
      </Box>
    </div>
  );
}

export default App;
