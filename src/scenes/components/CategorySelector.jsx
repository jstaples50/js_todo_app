import React, { useEffect } from "react";

import { Box, Typography } from "@mui/material";

import { getCategoriesFromLocalStorage } from "../../helper/localStorage";

const CategorySelector = ({
  categoryArray,
  categoriesToShow,
  setCategoriesToShow,
  childChange,
  setChildChange,
  categoriesDataSets,
  setCategoriesDataSets,
}) => {
  useEffect(() => {
    setCategoriesToShow(getCategoriesFromLocalStorage());
  }, []);

  return (
    <Box className="category-selector">
      {categoryArray.length
        ? categoryArray.map((c) => (
            <CategorySwitch
              key={c.title}
              category={c}
              categoriesToShow={categoriesToShow}
              setCategoriesToShow={setCategoriesToShow}
              childChange={childChange}
              setChildChange={setChildChange}
              categoriesDataSets={categoriesDataSets}
              setCategoriesDataSets={setCategoriesDataSets}
            />
          ))
        : null}
    </Box>
  );
};

export default CategorySelector;

const CategorySwitch = ({
  category,
  categoriesToShow,
  setCategoriesToShow,
  childChange,
  setChildChange,
  categoriesDataSets,
  setCategoriesDataSets,
}) => {
  const [selected, setSelected] = React.useState(true);

  const handleClick = (e) => {
    if (!categoriesToShow.includes(category) && !selected) {
      setCategoriesToShow((prev) => [...prev, category]);
      setSelected(true);
      setCategoriesDataSets((prev) => [
        ...prev,
        e.target.getAttribute("data-title"),
      ]);
      childChange ? setChildChange(false) : setChildChange(true);
    } else {
      const filteredCategories = categoriesToShow.filter(
        (c) => c.title !== category.title
      );
      const filteredDataSet = categoriesDataSets.filter(
        (data) => data !== e.target.getAttribute("data-title")
      );
      setCategoriesToShow(filteredCategories);
      setCategoriesDataSets(filteredDataSet);
      setSelected(false);
      childChange ? setChildChange(false) : setChildChange(true);
    }
  };

  return (
    <Box
      className="category-switch"
      display={"flex"}
      justifyContent={"flex-start"}
      alignItems={"center"}
    >
      <Box
        width={"15px"}
        height={"15px"}
        borderRadius={"50%"}
        mb={"12px"}
        mr={"12px"}
        mt={"12px"}
        bgcolor={category.color.value[500]}
        sx={
          !selected
            ? {
                "&:hover": {
                  cursor: "pointer",
                  outline: `3px solid ${category.color.value[800]}`,
                },
              }
            : {
                cursor: "pointer",
                outline: `3px solid ${category.color.value[800]}`,
              }
        }
        onClick={handleClick}
        data-title={`${category.title}`}
      ></Box>
      <Typography>{category.title}</Typography>
    </Box>
  );
};
