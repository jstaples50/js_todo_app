import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  Tooltip,
} from "@mui/material";
import Button from "@mui/material/Button";
import { updateTodoCategories } from "../../helper/localStorage";

function CategoryPopover({ Category, todo, childChange, setChildChange }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleCategoryDelete = () => {
    updateTodoCategories(todo, Category);
    setAnchorEl(null);
    childChange ? setChildChange(false) : setChildChange(true);
  };

  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? "simple-popover" : undefined;

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title={Category.title}>
        <Box
          width={"15px"}
          height={"15px"}
          borderRadius={"50%"}
          ml={"12px"}
          bgcolor={Category.color.value[500]}
          sx={{
            "&:hover": {
              cursor: "pointer",
              outline: `3px solid ${Category.color.value[800]}`,
            },
          }}
          onClick={handleClick}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        ></Box>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Remove Category?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleCategoryDelete}>Remove Category</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CategoryPopover;
