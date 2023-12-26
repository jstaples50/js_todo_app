import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { lightBlue, orange, green, grey, purple } from "@mui/material/colors";
import {
  updateTodoStatus,
  updateTodoPriority,
  deleteTodo,
} from "../helper/localStorage";

import StatusDialog from "./components/StatusDialog";
import CategoryPopover from "./components/CategoryPopover";
import DeleteTodo from "./components/DeleteTodo";
import DeleteHighPriority from "./components/DeleteHighPriority";
import AddCategory from "./components/AddCategory";
import EditTodo from "./components/EditTodo";

const ToDo = ({ todo, childChange, setChildChange, categoryArray }) => {
  const theme = useTheme();
  const statusButtonBlue = theme.palette.primary;
  const statusButtonOrange = theme.palette.warning;
  const statusButtonGreen = theme.palette.success;

  const [borderColor, setBorderColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [open, setOpen] = useState(false);

  const handleRemovePriorityClick = () => {
    updateTodoPriority(todo);
    childChange ? setChildChange(false) : setChildChange(true);
  };

  const handleAddPriorityClick = () => {
    updateTodoPriority(todo);
    childChange ? setChildChange(false) : setChildChange(true);
    setOpen(false);
  };

  const handleStatusChangeClick = (e) => {
    const selectedStatus = Number(e.target.getAttribute("data-status"));
    handleBorderColor(selectedStatus);
    updateTodoStatus(todo, selectedStatus);
    childChange ? setChildChange(false) : setChildChange(true);
    setOpen(false);
  };

  const handleTodoDelete = () => {
    deleteTodo(todo);
    childChange ? setChildChange(false) : setChildChange(true);
  };

  const handleBorderColor = (statusState) => {
    switch (statusState) {
      case 0:
        setBorderColor(statusButtonOrange);
        setBackgroundColor(orange[50]);
        break;
      case 1:
        setBorderColor(statusButtonBlue);
        setBackgroundColor(lightBlue[50]);
        break;
      case 2:
        setBorderColor(statusButtonGreen);
        setBackgroundColor(green[50]);
        break;
    }
  };

  useEffect(() => {
    handleBorderColor(todo.status);
  }, [todo]);

  return (
    <Box
      m={"10px"}
      bgcolor={backgroundColor}
      border={`solid 5px ${borderColor.main}`}
      borderRadius={"12px"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"95%"}
    >
      <Box
        className="priority-delete"
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        width={"100%"}
      >
        <DeleteTodo handleTodoDelete={handleTodoDelete} />
        <AddCategory
          childChange={childChange}
          setChildChange={setChildChange}
          categoryArray={categoryArray}
          todo={todo}
        />
        <EditTodo
          todo={todo}
          childChange={childChange}
          setChildChange={setChildChange}
        />
        {todo.highPriority && (
          <DeleteHighPriority
            handleRemovePriorityClick={handleRemovePriorityClick}
          />
        )}
        {todo.categories.length
          ? todo.categories.map((c) => (
              <Box key={c.title}>
                <CategoryPopover
                  Category={c}
                  todo={todo}
                  childChange={childChange}
                  setChildChange={setChildChange}
                />
              </Box>
            ))
          : null}
      </Box>
      <Typography sx={{ m: "5px", fontWeight: "bold", color: grey[600] }}>
        {todo.text}
      </Typography>
      <StatusButton onClick={() => setOpen(true)} statuscolor={borderColor}>
        Set Status
      </StatusButton>
      <StatusDialog
        open={open}
        setOpen={setOpen}
        handleStatusChangeClick={handleStatusChangeClick}
        handleAddPriorityClick={handleAddPriorityClick}
      />
    </Box>
  );
};

// TODO ---------------------------------------------------

const StatusButton = styled(Button)(({ theme, statuscolor }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: statuscolor.main,
  "&:hover": {
    backgroundColor: statuscolor.dark,
  },
}));

export default ToDo;
