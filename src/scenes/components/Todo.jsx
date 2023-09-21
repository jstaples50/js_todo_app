import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  ButtonGroup,
  useTheme,
  Dialog,
  DialogTitle,
  IconButton,
  Popover,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import {
  lightBlue,
  orange,
  green,
  grey,
  purple,
  red,
} from "@mui/material/colors";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import {
  updateTodoStatus,
  updateTodoPriority,
  updateTodoCategories,
  deleteTodo,
  addTodoCategory,
} from "../../helper/localStorage";

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
      width={"95vw"}
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
        {todo.highPriority && (
          <DeleteHighPriority
            handleRemovePriorityClick={handleRemovePriorityClick}
          />
        )}
        {todo.categories.length
          ? todo.categories.map((c) => (
              <Box>
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

// TODO ---------------------------------------------------

const StatusButton = styled(Button)(({ theme, statusColor }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: statusColor.main,
  "&:hover": {
    backgroundColor: statusColor.dark,
  },
}));

// STATUS BUTTON ---------------------------------------------------

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

// STATUS DIALOG ---------------------------------------------------

function CategoryPopover({ Category, todo, childChange, setChildChange }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryDelete = () => {
    updateTodoCategories(todo, Category);
    setAnchorEl(null);
    childChange ? setChildChange(false) : setChildChange(true);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
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
      ></Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>{Category.title}</Typography>
        <Button onClick={handleCategoryDelete}>Remove Category</Button>
      </Popover>
    </div>
  );
}

// CATEGORY POPOVER ---------------------------------------------------

function DeleteTodo({ handleTodoDelete }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton
        onClick={handleTodoDelete}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{ "&:hover": { color: red[500], bgcolor: red[50] } }}
      >
        <HighlightOffOutlinedIcon />
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
        <Typography sx={{ p: 1 }}>Delete Todo</Typography>
      </Popover>
    </div>
  );
}

// DELETE TODO ---------------------------------------------------

function DeleteHighPriority({ handleRemovePriorityClick }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton
        color="error"
        onClick={handleRemovePriorityClick}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <ErrorOutlineOutlinedIcon />
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
        <Typography sx={{ p: 1 }}>Delete Priority</Typography>
      </Popover>
    </div>
  );
}

// DELETE HIGH PRIORITY ---------------------------------------------------

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

  useEffect(() => {}, []);

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

// ADD CATEGORY (Several smaller components inside) ---------------------------------------------------

export default ToDo;
