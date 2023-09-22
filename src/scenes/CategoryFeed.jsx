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
  FormGroup,
  FormControlLabel,
  Switch,
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
            <Box key={category.title}>
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
      <CategorySelector categoryArray={categoryArray} />
    </Box>
  );
};

export default CategoryFeed;

const CategorySelector = ({ categoryArray }) => {
  const [categoriesToShow, setCategoriesToShow] = useState(categoryArray);

  const CategorySwitch = ({ category }) => {
    // const [checked, setChecked] = useState(true);

    const handleCategorySwitchChange = (e) => {
      // setChecked(e.target.checked);
      // if (checked && !categoriesToShow.includes(category)) {
      //   setCategoriesToShow((prev) => [...prev, category]);
      // } else {
      //   const filteredCategories = categoriesToShow.filter(
      //     (c) => c.title !== category.title
      //   );
      //   setCategoriesToShow(filteredCategories);
      // }

      if (!categoriesToShow.includes(category)) {
        setCategoriesToShow((prev) => [...prev, category]);
      } else {
        const filteredCategories = categoriesToShow.filter(
          (c) => c.title !== category.title
        );
        setCategoriesToShow(filteredCategories);
      }
    };

    const [selected, setSelected] = React.useState(false);

    const handleChange = (event) => {
      // if (!categoriesToShow.includes(category)) {
      //   setCategoriesToShow((prev) => [...prev, category]);
      // } else {
      //   const filteredCategories = categoriesToShow.filter(
      //     (c) => c.title !== category.title
      //   );
      //   setCategoriesToShow(filteredCategories);
      // }
      // setChecked(event.target.checked);
      // setCategoriesToShow("test");
      // console.log(categoriesToShow);
      // categoriesToShow.includes(category)
      //   ? setCategoriesToShow((prev) =>
      //       prev.filter((c) => c.title !== category.title)
      //     )
      //   : setCategoriesToShow((prev) => [...prev, category]);
    };

    // useEffect(() => {
    //   categoriesToShow.includes(category)
    //     ? setCategoriesToShow((prev) =>
    //         prev.filter((c) => c.title !== category.title)
    //       )
    //     : setCategoriesToShow((prev) => [...prev, category]);
    // }, []);

    const handleClick = () => {
      if (!categoriesToShow.includes(category) && !selected) {
        setCategoriesToShow((prev) => [...prev, category]);
        setSelected(true);
        console.log("check 1");
      } else {
        const filteredCategories = categoriesToShow.filter(
          (c) => c.title !== category.title
        );
        setCategoriesToShow(filteredCategories);
        setSelected(false);
        console.log("check 2");
      }
    };

    const handleCategoryClick = () => {
      if (!selected) {
        setSelected(true);
        setCategoriesToShow((prev) => [...prev, category]);
      } else {
        setSelected(false);
        const filteredCategories = categoriesToShow.filter(
          (c) => c.title !== category.title
        );
        setCategoriesToShow(filteredCategories);
      }
    };

    return (
      // <FormControlLabel
      //   control={
      //     <Switch
      //       defaultChecked
      //       value={category}
      //       sx={{
      //         "&.MuiSwitch-root .MuiSwitch-switchBase": {
      //           color: "red",
      //         },

      //         "&.MuiSwitch-root .Mui-checked": {
      //           color: category.color.value[500],
      //         },
      //         "&.MuiSwitch-root .MuiSwitch-track": {
      //           backgroundColor: category.color.value[300],
      //         },
      //       }}
      //     />
      //   }
      //   label={category.title}
      // />

      // <MenuItem key={category.title} value={category}>
      //   <Checkbox
      //     sx={{
      //       color: category.color.value[800],
      //       "&.Mui-checked": {
      //         color: category.color.value[600],
      //       },
      //     }}
      //     onClick={handleChange}
      //     checked={checked}
      //   />
      //   <ListItemText primary={category.title} />
      // </MenuItem>
      <Box
        width={"15px"}
        height={"15px"}
        borderRadius={"50%"}
        mb={"12px"}
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
      ></Box>
    );
  };

  useEffect(() => {
    console.log(categoriesToShow);
  }, []);

  return (
    <Box className="category-selector">
      {categoryArray.length
        ? categoryArray.map((c) => (
            // <FormControlLabel
            //   key={c.title}
            //   control={
            //     <Switch
            //       defaultChecked
            //       value={c}
            //       sx={{
            //         "&.MuiSwitch-root .MuiSwitch-switchBase": {
            //           color: "red",
            //         },

            //         "&.MuiSwitch-root .Mui-checked": {
            //           color: c.color.value[500],
            //         },
            //         "&.MuiSwitch-root .MuiSwitch-track": {
            //           backgroundColor: c.color.value[300],
            //         },
            //       }}
            //     />
            //   }
            //   label={c.title}
            // />
            <CategorySwitch key={c.title} category={c} />
          ))
        : null}

      {categoriesToShow &&
        categoriesToShow.map((c) => <Typography>{c.title}</Typography>)}
    </Box>
  );
};
