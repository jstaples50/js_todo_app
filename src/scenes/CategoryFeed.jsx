import React, { useState, useEffect } from "react";

import {
  Box,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
} from "@mui/material";

import CategorySelector from "./components/CategorySelector";

import { colors } from "../helper/theme";
import { grey } from "@mui/material/colors";

import {
  setCategoryToLocalStorage,
  getCategoriesFromLocalStorage,
} from "../helper/localStorage";

const CategoryFeed = ({
  categoryArray,
  setCategoryArray,
  categoriesToShow,
  setCategoriesToShow,
  childChange,
  setChildChange,
  categoriesDataSets,
  setCategoriesDataSets,
}) => {
  const [formInputs, setFormInputs] = useState({ title: "", color: "" });

  const createCategory = (formInputs) => {
    const category = {
      title: formInputs.title,
      color: formInputs.color,
    };
    setCategoryToLocalStorage(category);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    createCategory(formInputs);
    setFormInputs({ title: "", color: "" });
  };

  const handleCategoryFormChange = (e) => {
    const { name, value } = e.target;

    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  };

  useEffect(() => {
    setCategoryArray(getCategoriesFromLocalStorage());
  }, [formInputs]);

  return (
    <Box width={"25%"}>
      <Box>
        <form onSubmit={handleFormSubmit}>
          <Box className="category-form-inputs">
            <TextField
              // id="filled-basic"
              label="Enter New Category"
              placeholder="Enter New Category"
              variant="filled"
              autoComplete="off"
              name="title"
              value={formInputs.title}
              onChange={handleCategoryFormChange}
            />
            <InputLabel id="demo-simple-select-label">Color</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              placeholder="Color"
              name="color"
              value={formInputs.color}
              label="Color"
              onChange={handleCategoryFormChange}
              sx={{ minWidth: "120px" }}
            >
              {colors.map((color) => (
                <MenuItem key={color.name} value={color}>
                  <Checkbox
                    sx={{
                      color: color.value[800],
                      "&.Mui-checked": {
                        color: color.value[600],
                      },
                    }}
                  />
                  <ListItemText primary={color.name} />
                </MenuItem>
              ))}
            </Select>
            <Button variant="contained" onClick={handleFormSubmit}>
              Add Category
            </Button>
          </Box>
        </form>
        <Box
          width={"100px"}
          height={"100px"}
          borderRadius={"50%"}
          m={"12px"}
          bgcolor={formInputs.color ? formInputs.color.value[500] : grey[500]}
        ></Box>
        <Typography>{formInputs.color.name}</Typography>
      </Box>
      <CategorySelector
        categoryArray={categoryArray}
        categoriesToShow={categoriesToShow}
        setCategoriesToShow={setCategoriesToShow}
        childChange={childChange}
        setChildChange={setChildChange}
        categoriesDataSets={categoriesDataSets}
        setCategoriesDataSets={setCategoriesDataSets}
      />
    </Box>
  );
};

export default CategoryFeed;
