import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  Typography,
  Button,
  ButtonGroup,
  useTheme,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { sortByDate } from "../helper/helperFunctions";
import {
  setTodoToLocalStorage,
  getTodosFromLocalStorage,
  updateTodoStatus,
} from "../helper/localStorage";

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
      status: 0,
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
    const sortedTodoArray = getTodosFromLocalStorage();
    sortByDate(sortedTodoArray);
    setTodoArray(sortedTodoArray);
  }, [todo]);

  return (
    <Box>
      <Typography variant="h5">Todo Feed Component</Typography>
      <form onSubmit={handleTodoSubmit}>
        <TextField
          id="filled-basic"
          label="Enter Todo Here"
          placeholder="Enter Todo Here"
          variant="filled"
          autoComplete="off"
          value={todo}
          onChange={handleTodoChange}
        />
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
      </form>
      <Box>
        {todoArray.length ? (
          todoArray.map((todo, index) => <ToDo key={index} todo={todo}></ToDo>)
        ) : (
          <Typography>No Todos Yet!</Typography>
        )}
      </Box>
    </Box>
  );
};

const ToDo = ({ todo }) => {
  const theme = useTheme();
  const [status, setStatus] = useState(todo.status);
  const [borderColor, setBorderColor] = useState("");
  const [open, setOpen] = useState(false);

  const handleStatusChangeClick = (e) => {
    const selectedStatus = Number(e.target.getAttribute("data-status"));
    handleBorderColor(selectedStatus);
    updateTodoStatus(todo, selectedStatus);
  };

  const handleBorderColor = (statusState) => {
    switch (statusState) {
      case 0:
        setBorderColor(theme.palette.primary.main);
        break;
      case 1:
        setBorderColor(theme.palette.warning.main);
        break;
      case 2:
        setBorderColor(theme.palette.success.main);
        break;
    }
  };

  useEffect(() => {
    handleBorderColor(todo.status);
  }, []);

  return (
    <Box m={"10px"} border={`solid 2px ${borderColor}`} borderRadius={"12px"}>
      <Typography>{todo.text}</Typography>
      {todo.highPriority && (
        <Box bgcolor={"red"} width={"10px"} height={"10px"}></Box>
      )}
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Set Status
      </Button>
      <StatusDialog
        open={open}
        setOpen={setOpen}
        handleStatusChangeClick={handleStatusChangeClick}
      />
    </Box>
  );
};

// const StatusButton = ({ text }) => {
//   const [filled, setFilled] = useState("outlined");
//   const handleFillChange = () => {
//     filled === "outlined" ? setFilled("contained") : setFilled("filled");
//   };

//   return (
//     <Button
//       size="small"
//       variant={filled}
//       color="primary"
//       data-status="0"
//       onClick={handleFillChange}
//     >
//       {text}
//     </Button>
//   );
// };

const StatusDialog = ({ open, setOpen, handleStatusChangeClick }) => {
  // const handleChoiceClick = (e) => {
  //   handleStatusChangeClick();
  // };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Set Current Status</DialogTitle>
      <ButtonGroup>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          data-status="0"
          onClick={handleStatusChangeClick}
        >
          Not Started
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="warning"
          data-status="1"
          onClick={handleStatusChangeClick}
        >
          In Progress
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="success"
          data-status="2"
          onClick={handleStatusChangeClick}
        >
          Done!
        </Button>
      </ButtonGroup>
    </Dialog>
  );
};

export default TodoFeed;
