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
  Checkbox,
  ListItemText,
  OutlinedInput,
  FormControl,
  FormHelperText,
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
import { sortByStatusAndDate } from "../helper/helperFunctions";
import {
  setTodoToLocalStorage,
  getTodosFromLocalStorage,
  deleteAllTodos,
  createSavedTodosInLocalStorage,
  getAndSaveTodoListFromLocalStorage,
  getSavedTodoListsNamesFromLocalStorage,
  saveMyCurrentTodos,
} from "../helper/localStorage";
import ToDo from "./components/Todo";

const TodoFeed = ({
  categoryArray,
  setCategoryArray,
  categoriesToShow,
  childChange,
  setChildChange,
  categoriesDataSets,
  setCategoriesDataSets,
}) => {
  const [todo, setTodo] = useState("");
  const [todoArray, setTodoArray] = useState([]);
  const [highPriority, setHighPriority] = useState("outlined");
  const [categoriesSelected, setCategoriesSelected] = useState([]);

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  const handleTodoSubmit = (e) => {
    e.preventDefault();
    if (todo !== "") {
      const newTodo = {
        id: uuidv4(),
        date: new Date(),
        text: todo,
        highPriority: highPriority === "contained" ? true : false,
        status: 1,
        categories: categoriesSelected.length ? categoriesSelected : [],
      };
      setTodoToLocalStorage(newTodo);
      setTodo("");
      setHighPriority("outlined");
      setCategoriesSelected([]);
      childChange ? setChildChange(false) : setChildChange(true);
    } else return;
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

  const handleCategorySelectionChange = (e) => {
    // setCategoriesSelected(e.target.value);
    const {
      target: { value },
    } = e;

    setCategoriesSelected(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const filterCategoryStrings = (todo, categoriesDataSets) => {
    const categoryStringArray = [];
    todo.categories.map((c) => categoryStringArray.push(c.title));
    let isCategory = false;
    categoriesDataSets.forEach((c) => {
      if (categoryStringArray.includes(c)) {
        isCategory = true;
      }
    });
    return isCategory;
  };

  useEffect(() => {
    const todosFromStorage = getTodosFromLocalStorage();
    const totalSortedArray = sortByStatusAndDate(todosFromStorage);
    setTodoArray(totalSortedArray);
  }, [todo, childChange]);

  return (
    <Box>
      <Box
        className="delete-bar"
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
      <form onSubmit={handleTodoSubmit}>
        <Box
          className="form-inputs"
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100vw"}
        >
          <TextField
            id="filled-basic"
            label="Enter Todo Here"
            placeholder="Enter Todo Here"
            variant="filled"
            autoComplete="off"
            value={todo}
            onChange={handleTodoChange}
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
          <FormControl sx={{ m: 1, minWidth: 400 }}>
            <InputLabel>Select Category</InputLabel>
            <Select
              multiple
              autoWidth
              input={<OutlinedInput label="Tag" />}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              placeholder="Select Category"
              name="color"
              value={categoriesSelected}
              label="Select Category"
              onChange={handleCategorySelectionChange}
              // renderValue={(selected) => selected.join(", ")}
              // MenuProps={MenuProps}
            >
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              {categoryArray.length &&
                categoryArray.map((category) => (
                  <MenuItem key={category.title} value={category}>
                    {/* <Checkbox
                      sx={{
                        color: category.color.value[800],
                        "&.Mui-checked": {
                          color: category.color.value[600],
                        },
                      }}
                    /> */}
                    <Box
                      bgcolor={category.color.value[500]}
                      width={"15px"}
                      height={"15px"}
                      borderRadius={"50%"}
                      m={"12px"}
                    ></Box>
                    <ListItemText primary={category.title} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </form>
      <Box
        textAlign={"center"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {todoArray.length ? (
          todoArray
            .filter(
              (t) =>
                t.status === 0 && filterCategoryStrings(t, categoriesDataSets)
            )
            .map((todo, index) => (
              <ToDo
                key={index}
                todo={todo}
                childChange={childChange}
                setChildChange={setChildChange}
                categoryArray={categoryArray}
              />
            ))
        ) : (
          <Typography mt={"10px"}>No Todos Yet!</Typography>
        )}
        <Divider
          sx={{ bgcolor: grey[400], width: "95vw", borderBottomWidth: 4, m: 2 }}
        ></Divider>
        {todoArray.length
          ? todoArray
              .filter(
                (t) =>
                  t.status === 1 && filterCategoryStrings(t, categoriesDataSets)
              )
              .map((todo, index) => (
                <ToDo
                  key={index}
                  todo={todo}
                  childChange={childChange}
                  setChildChange={setChildChange}
                  categoryArray={categoryArray}
                />
              ))
          : null}
        <Divider
          sx={{ bgcolor: grey[400], width: "95vw", borderBottomWidth: 4, m: 2 }}
        ></Divider>
        {todoArray.length
          ? todoArray
              .filter(
                (t) =>
                  t.status === 2 && filterCategoryStrings(t, categoriesDataSets)
              )
              .map((todo, index) => (
                <ToDo
                  key={index}
                  todo={todo}
                  childChange={childChange}
                  setChildChange={setChildChange}
                  categoryArray={categoryArray}
                />
              ))
          : null}
        <Divider
          sx={{
            bgcolor: grey[400],
            width: "95vw",
            borderBottomWidth: 4,
            m: 2,
          }}
        ></Divider>
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
        {/* <DialogActions> */}
        <form onSubmit={handleSubmit}>
          {/* <TextField
              id="filled-basic"
              label="Enter Todo Here"
              placeholder="Enter Todo List Name"
              variant="filled"
              autoComplete="off"
              value={todoList}
              onChange={handleTodoListChange}
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
            /> */}
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
              {listOfSavedTodos.length &&
                listOfSavedTodos.map((savedListName) => (
                  <MenuItem key={savedListName} value={savedListName}>
                    <ListItemText primary={savedListName} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Box className="restore-todo">
            <Button onClick={handleSubmit}>Restore ToDo List</Button>
          </Box>
        </form>
        {/* </DialogActions> */}
      </Dialog>
    </div>
  );
};
