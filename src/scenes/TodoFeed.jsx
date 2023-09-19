import React, { useState, useEffect } from "react";
import { TextField, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import { sortByStatusAndDate } from "../helper/helperFunctions";
import {
  setTodoToLocalStorage,
  getTodosFromLocalStorage,
} from "../helper/localStorage";
import ToDo from "./components/Todo";

const TodoFeed = () => {
  const [todo, setTodo] = useState("");
  const [todoArray, setTodoArray] = useState([]);
  const [highPriority, setHighPriority] = useState("outlined");

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
  };

  const handleHighPriorityClick = () => {
    highPriority === "outlined"
      ? setHighPriority("contained")
      : setHighPriority("outlined");
  };

  useEffect(() => {
    const todosFromStorage = getTodosFromLocalStorage();
    const totalSortedArray = sortByStatusAndDate(todosFromStorage);
    setTodoArray(totalSortedArray);
  }, [todo]);

  return (
    <Box>
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
      <Box>
        {todoArray.length ? (
          todoArray.map((todo, index) => <ToDo key={index} todo={todo} />)
        ) : (
          <Typography>No Todos Yet!</Typography>
        )}
      </Box>
    </Box>
  );
};

export default TodoFeed;
