import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  Select,
  MenuItem,
  ListItemText,
  OutlinedInput,
  FormControl,
  InputLabel,
  Divider,
  Popover,
} from "@mui/material";
import Button from "@mui/material/Button";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import RestoreIcon from "@mui/icons-material/Restore";
import SaveIcon from "@mui/icons-material/Save";
import { grey, red, green, lightBlue } from "@mui/material/colors";
import { v4 as uuidv4 } from "uuid";
import { sortByStatusAndDate } from "../../helper/helperFunctions";
import {
  setTodoToLocalStorage,
  getTodosFromLocalStorage,
  deleteAllTodos,
  createSavedTodosInLocalStorage,
  getAndSaveTodoListFromLocalStorage,
  getSavedTodoListsNamesFromLocalStorage,
} from "../../helper/localStorage";
import { filterCategoryStrings } from "../../helper/helperFunctions";

const OptionsBar = ({ childChange, setChildChange, setTodoArray }) => {
  const handleAllTodosDelete = () => {
    deleteAllTodos();
    setTodoArray([]);
  };

  return (
    <Box
      className="options-bar"
      width={"100vw"}
      display={"flex"}
      justifyContent={"flex-start"}
      alignItems={"center"}
    >
      <DeleteDialog handleAllTodosDelete={handleAllTodosDelete} />
      <SaveDialog handleAllTodosDelete={handleAllTodosDelete} />
      <RestoreDialog
        childChange={childChange}
        setChildChange={setChildChange}
      />
    </Box>
  );
};

export default OptionsBar;

const DeleteDialog = ({ handleAllTodosDelete }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePermanentDelete = () => {
    handleAllTodosDelete();
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);

  return (
    <div>
      <IconButton
        onClick={handleClickOpen}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{
          "&:hover": { color: red[500], bgcolor: red[50] },
          m: "12px",
          color: red[500],
        }}
      >
        <DeleteForeverOutlinedIcon />
      </IconButton>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={popoverOpen}
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
        <Typography sx={{ p: 1 }}>Delete All Todos</Typography>
      </Popover>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete All of Your ToDos?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handlePermanentDelete}>
            Permanently Delete Todos
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const SaveDialog = ({ handleAllTodosDelete }) => {
  const [open, setOpen] = useState(false);
  const [namedTodoList, setNamedTodoList] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleListNameChange = (e) => {
    setNamedTodoList(e.target.value);
  };

  // !!!!!!!!
  const handleSaveAndDelete = () => {
    createSavedTodosInLocalStorage(namedTodoList);
    handleAllTodosDelete();
    setNamedTodoList("");
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveAndDelete();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);

  return (
    <div>
      <IconButton
        onClick={handleClickOpen}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{
          "&:hover": { color: lightBlue[500], bgcolor: lightBlue[50] },
          m: "12px",
          color: lightBlue[500],
        }}
      >
        <SaveIcon />
      </IconButton>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={popoverOpen}
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
        <Typography sx={{ p: 1 }}>Save Todo List</Typography>
      </Popover>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Save Your Todo List?"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogActions>
            <TextField
              id="filled-basic"
              label="Enter List Name"
              placeholder="Enter List Name"
              variant="filled"
              autoComplete="off"
              value={namedTodoList}
              onChange={handleListNameChange}
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
            <Button onClick={handleSaveAndDelete} autoFocus>
              Save Todos and Start New Feed
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

const RestoreDialog = ({ childChange, setChildChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedSavedTodoList, setSelectedSavedTodoList] = useState([]);

  // placeholder fix
  const listOfSavedTodos = getSavedTodoListsNamesFromLocalStorage();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSavedTodoList !== "") {
      getAndSaveTodoListFromLocalStorage(selectedSavedTodoList);
      setOpen(false);
      childChange ? setChildChange(false) : setChildChange(true);
      setSelectedSavedTodoList([]);
    } else return;
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);

  const handleSavedTodoListChange = (e) => {
    const {
      target: { value },
    } = e;
    setSelectedSavedTodoList(
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <IconButton
        onClick={handleClickOpen}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{
          "&:hover": { color: green[500], bgcolor: green[50] },
          color: green[500],
          m: "12px",
        }}
      >
        <RestoreIcon />
      </IconButton>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={popoverOpen}
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
        <Typography sx={{ p: 1 }}>Restore Todo List</Typography>
      </Popover>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Restore Your ToDo's?"}
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <FormControl sx={{ m: 1, minWidth: 400 }}>
            <InputLabel>Select Todo List</InputLabel>
            <Select
              autoWidth
              input={<OutlinedInput label="Tag" />}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              placeholder="Select Todo List"
              name="todo-list"
              value={selectedSavedTodoList}
              label="Select Todo List"
              onChange={handleSavedTodoListChange}
            >
              {listOfSavedTodos.length ? (
                listOfSavedTodos.map((savedListName) => (
                  <MenuItem key={savedListName} value={savedListName}>
                    <ListItemText primary={savedListName} />
                  </MenuItem>
                ))
              ) : (
                <MenuItem>
                  <ListItemText primary="No Saved Todo Lists!" />
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <Box className="restore-todo">
            <Button onClick={handleSubmit}>Restore ToDo List</Button>
          </Box>
        </form>
      </Dialog>
    </div>
  );
};
