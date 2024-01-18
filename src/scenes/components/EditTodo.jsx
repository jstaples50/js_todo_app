import React, { useState, useEffect } from "react";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  IconButton,
  Popover,
} from "@mui/material";
import Button from "@mui/material/Button";
import { orange, yellow } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import { updateTodoText } from "../../helper/localStorage";

const EditTodo = ({ todo, childChange, setChildChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [todoText, setTodoText] = useState(todo.text);

  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
    console.log(todoText);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleTodoTextChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodoText(todo, todoText);
    setDialogOpen(false);
    childChange ? setChildChange(false) : setChildChange(true);
  };

  useEffect(() => {
    setTodoText(todo.text);
  }, [dialogOpen, childChange]);

  return (
    <div>
      <IconButton
        onClick={handleDialogOpen}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{ "&:hover": { bgcolor: yellow[200], color: orange[700] } }}
        // style={{ color: yellow[500] }}
      >
        <EditIcon />
      </IconButton>
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
        <Typography sx={{ p: 1 }}>Edit Todo</Typography>
      </Popover>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Todo"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogActions>
            <TextField
              id="filled-basic"
              label="New Text"
              placeholder={todoText}
              variant="filled"
              autoComplete="off"
              value={todoText}
              onChange={handleTodoTextChange}
              fullWidth
              sx={{
                width: "90%",
                m: "10px auto",
              }}
              InputProps={{
                sx: {
                  "& input": {
                    textAlign: "center",
                  },
                },
              }}
            />
            <Button onClick={handleSubmit} autoFocus>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default EditTodo;
