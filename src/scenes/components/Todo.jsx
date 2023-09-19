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
import { lightBlue, orange, green, grey, purple } from "@mui/material/colors";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import {
  updateTodoStatus,
  updateTodoPriority,
  deleteTodo,
} from "../../helper/localStorage";

const ToDo = ({ todo, childChange, setChildChange }) => {
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
        {/* just priority before */}
        {todo.highPriority && (
          <IconButton color="error" onClick={handleRemovePriorityClick}>
            <ErrorOutlineOutlinedIcon />
          </IconButton>
        )}
      </Box>
      <Typography sx={{ m: "5px", fontWeight: "bold", color: grey[600] }}>
        {todo.text}
      </Typography>
      {/* <Button variant="contained" onClick={() => setOpen(true)}>
        Set Status
      </Button> */}
      <StatusButton onClick={() => setOpen(true)} statusColor={borderColor}>
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

const StatusButton = styled(Button)(({ theme, statusColor }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: statusColor.main,
  "&:hover": {
    backgroundColor: statusColor.dark,
  },
}));

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
