import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { v4 as uuidv4 } from "uuid";
import { sortByStatusAndDate } from "../helper/helperFunctions";
import {
  setTodoToLocalStorage,
  getTodosFromLocalStorage,
  deleteAllTodos,
  createSavedTodosInLocalStorage,
} from "../helper/localStorage";
import ToDo from "./components/Todo";

const TodoFeed = () => {
  const [todo, setTodo] = useState("");
  const [todoArray, setTodoArray] = useState([]);
  const [highPriority, setHighPriority] = useState("outlined");
  const [childChange, setChildChange] = useState(false);

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  const handleTodoSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: uuidv4(),
      date: new Date(),
      text: todo,
      highPriority: highPriority === "contained" ? true : false,
      status: 1,
    };
    setTodoToLocalStorage(newTodo);
    setTodo("");
    setHighPriority("outlined");
    // childChange ? setChildChange(false) : setChildChange(true);
    // console.log(childChange);
    if (childChange) {
      setChildChange(false);
      console.log("submit child change true");
    } else {
      setChildChange(true);
      console.log("submit child change false");
    }
  };

  const handleHighPriorityClick = () => {
    highPriority === "outlined"
      ? setHighPriority("contained")
      : setHighPriority("outlined");
  };

  const handleAllTodosDelete = () => {
    deleteAllTodos();
    setTodoArray([]);
  };

  useEffect(() => {
    const todosFromStorage = getTodosFromLocalStorage();
    const totalSortedArray = sortByStatusAndDate(todosFromStorage);
    setTodoArray(totalSortedArray);
  }, [todo, childChange]);

  return (
    <Box>
      <Box className="delete-bar" width={"100vw"}>
        {/* <IconButton onClick={handleAllTodosDelete}>
          <DeleteForeverOutlinedIcon />
        </IconButton> */}
        <DeleteDialog handleAllTodosDelete={handleAllTodosDelete} />
      </Box>
      <form onSubmit={handleTodoSubmit}>
        <Box
          className="form-inputs"
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          // width={"400px"}
        >
          <TextField
            id="filled-basic"
            label="Enter Todo Here"
            placeholder="Enter Todo Here"
            variant="filled"
            autoComplete="off"
            value={todo}
            onChange={handleTodoChange}
            sx={{ m: "10px" }}
          />
          <Box
            className="form-buttons"
            display={"flex"}
            width={"300px"}
            justifyContent={"space-evenly"}
          >
            <Button variant="outlined" onClick={handleTodoSubmit}>
              Submit
            </Button>
            <Button
              variant={highPriority}
              color="error"
              onClick={handleHighPriorityClick}
            >
              High Priority
            </Button>
          </Box>
        </Box>
      </form>
      <Box textAlign={"center"}>
        {todoArray.length ? (
          todoArray.map((todo, index) => (
            <ToDo
              key={index}
              todo={todo}
              childChange={childChange}
              setChildChange={setChildChange}
            />
          ))
        ) : (
          <Typography>No Todos Yet!</Typography>
        )}
      </Box>
    </Box>
  );
};

export default TodoFeed;

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

  const handleSaveAndDelete = () => {
    createSavedTodosInLocalStorage();
    handleAllTodosDelete();
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <DeleteForeverOutlinedIcon />
      </IconButton>
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
          <Button onClick={handleSaveAndDelete} autoFocus>
            Save Todos and Start New Feed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
