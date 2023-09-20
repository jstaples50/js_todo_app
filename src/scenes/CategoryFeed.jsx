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

import { colors } from "../helper/theme";
import { grey } from "@mui/material/colors";

import {
  setCategoryToLocalStorage,
  getCategoriesFromLocalStorage,
} from "../helper/localStorage";

const CategoryFeed = ({ categoryArray, setCategoryArray }) => {
  const [formInputs, setFormInputs] = useState({ title: "", color: "" });
  // const [categoryArray, setCategoryArray] = useState([]);

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
    <Box>
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
              // renderValue={formInputs.color}
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
          bgcolor={formInputs.color ? formInputs.color.value[500] : grey[500]}
        ></Box>
        <Typography>{formInputs.color.name}</Typography>
      </Box>
      {/* <Box className="category-displays">
        {categoryArray.length &&
          categoryArray.map((category) => (
            <Box>
              <Box
                width={"20px"}
                height={"20px"}
                borderRadius={"50%"}
                bgcolor={category.color.value[500]}
                m={"10px"}
              ></Box>
              <Typography>{category.title}</Typography>
            </Box>
          ))}
      </Box> */}
    </Box>
  );
};

export default CategoryFeed;
