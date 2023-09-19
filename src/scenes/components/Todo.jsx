import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  ButtonGroup,
  useTheme,
  Dialog,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { lightBlue, orange, green, grey } from "@mui/material/colors";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import {
  updateTodoStatus,
  updateTodoPriority,
  deleteTodo,
} from "../../helper/localStorage";

const ToDo = ({ todo }) => {
  const theme = useTheme();
  const statusButtonBlue = theme.palette.primary;
  const statusButtonOrange = theme.palette.warning;
  const statusButtonGreen = theme.palette.success;

  const [borderColor, setBorderColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState(todo.highPriority);

  const handleRemovePriorityClick = () => {
    updateTodoPriority(todo);
    setPriority(false);
    // TEMPORARY FIX: need to figure out state based solution
    window.location.href = "/";
  };

  const handleAddPriorityClick = () => {
    updateTodoPriority(todo);
    setPriority(true);
    setOpen(false);
    // TEMPORARY FIX: need to figure out state based solution
    window.location.href = "/";
  };

  const handleStatusChangeClick = (e) => {
    const selectedStatus = Number(e.target.getAttribute("data-status"));
    // handleStatusChange();
    handleBorderColor(selectedStatus);
    updateTodoStatus(todo, selectedStatus);
    setOpen(false);
    // TEMPORARY FIX: need to figure out state based solution
    window.location.href = "/";
  };

  const handleTodoDelete = () => {
    deleteTodo(todo);
    // TEMPORARY FIX: need to figure out state based solution
    window.location.href = "/";
  };

  const handleBorderColor = (statusState) => {
    switch (statusState) {
      case 0:
        setBorderColor(statusButtonOrange.main);
        setBackgroundColor(orange[50]);
        break;
      case 1:
        setBorderColor(statusButtonBlue.main);
        setBackgroundColor(lightBlue[50]);
        break;
      case 2:
        setBorderColor(statusButtonGreen.main);
        setBackgroundColor(green[50]);
        break;
    }
  };

  useEffect(() => {
    handleBorderColor(todo.status);
  }, []);

  return (
    <Box
      m={"10px"}
      bgcolor={backgroundColor}
      border={`solid 5px ${borderColor}`}
      borderRadius={"12px"}
      // textAlign={"center"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"95vw"}
    >
      <Box
        className="priority-delete"
        display={"flex"}
        justifyContent={"flex-start"}
        width={"100%"}
      >
        <IconButton onClick={handleTodoDelete}>
          <HighlightOffOutlinedIcon />
        </IconButton>
        {priority && (
          <IconButton color="error" onClick={handleRemovePriorityClick}>
            <ErrorOutlineOutlinedIcon />
          </IconButton>
        )}
      </Box>
      <Typography sx={{ m: "5px", fontWeight: "bold", color: grey[600] }}>
        {todo.text}
      </Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Set Status
      </Button>
      <StatusDialog
        open={open}
        setOpen={setOpen}
        handleStatusChangeClick={handleStatusChangeClick}
        handleAddPriorityClick={handleAddPriorityClick}
      />
    </Box>
  );
};

const StatusDialog = ({
  open,
  setOpen,
  handleStatusChangeClick,
  handleAddPriorityClick,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Set Current Status</DialogTitle>
      <ButtonGroup>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          data-status="1"
          onClick={handleStatusChangeClick}
        >
          Not Started
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="warning"
          data-status="0"
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
        <Button
          size="small"
          variant="outlined"
          color="error"
          data-status="2"
          onClick={handleAddPriorityClick}
        >
          Make High Priority
        </Button>
      </ButtonGroup>
    </Dialog>
  );
};

export default ToDo;
