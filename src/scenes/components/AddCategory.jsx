import React, { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  IconButton,
  Popover,
} from "@mui/material";
import { green } from "@mui/material/colors";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { addTodoCategory } from "../../helper/localStorage";

function AddCategory({ childChange, setChildChange, categoryArray, todo }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const ColorDialog = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleClose = () => {
      setCategoryOpen(false);
      addTodoCategory(todo, selectedCategories);
      childChange ? setChildChange(false) : setChildChange(true);
    };

    return (
      <Dialog open={categoryOpen} onClose={handleClose} maxWidth={"xs"}>
        <DialogTitle>Choose Categories to Add</DialogTitle>
        <Box display={"flex"} justifyContent={"space-evenly"} flexWrap={"wrap"}>
          {categoryArray &&
            categoryArray.map((c) => (
              <ColorOptionButton
                key={c.title}
                category={c}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
            ))}
        </Box>
      </Dialog>
    );
  };

  const ColorOptionButton = ({
    category,
    selectedCategories,
    setSelectedCategories,
  }) => {
    const [selected, setSelected] = useState(false);

    const handleCategoryClick = () => {
      if (!selected) {
        setSelected(true);
        setSelectedCategories((prev) => [...prev, category]);
      } else {
        setSelected(false);
        const filteredCategories = selectedCategories.filter(
          (c) => c.title !== category.title
        );
        setSelectedCategories(filteredCategories);
      }
    };

    return (
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        m={"10px"}
        textAlign={"center"}
      >
        <Typography>{category.title}</Typography>
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
          onClick={handleCategoryClick}
        ></Box>
      </Box>
    );
  };

  return (
    <div>
      <IconButton
        onClick={() => setCategoryOpen(true)}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{ "&:hover": { bgcolor: green[200] } }}
        style={{ color: green[500] }}
      >
        <AddCircleOutlineOutlinedIcon />
      </IconButton>
      <ColorDialog />
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Add Category</Typography>
      </Popover>
    </div>
  );
}

export default AddCategory;
