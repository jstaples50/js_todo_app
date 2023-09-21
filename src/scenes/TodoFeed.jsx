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
} from "@mui/material";
import Button from "@mui/material/Button";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { grey, red } from "@mui/material/colors";
import { v4 as uuidv4 } from "uuid";
import { sortByStatusAndDate } from "../helper/helperFunctions";
import {
  setTodoToLocalStorage,
  getTodosFromLocalStorage,
  deleteAllTodos,
  createSavedTodosInLocalStorage,
} from "../helper/localStorage";
import ToDo from "./components/Todo";
import { Check } from "@mui/icons-material";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

const TodoFeed = ({ categoryArray, setCategoryArray }) => {
  const [todo, setTodo] = useState("");
  const [todoArray, setTodoArray] = useState([]);
  const [highPriority, setHighPriority] = useState("outlined");
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [childChange, setChildChange] = useState(false);

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
        categories: categoriesSelected,
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

  useEffect(() => {
    const todosFromStorage = getTodosFromLocalStorage();
    const totalSortedArray = sortByStatusAndDate(todosFromStorage);
    setTodoArray(totalSortedArray);
  }, [todo, childChange]);

  return (
    <Box>
      <Box className="delete-bar" width={"100vw"}>
        <DeleteDialog handleAllTodosDelete={handleAllTodosDelete} />
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
            .filter((t) => t.status === 0)
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
              .filter((t) => t.status === 1)
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
              .filter((t) => t.status === 2)
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

  const handleSaveAndDelete = () => {
    createSavedTodosInLocalStorage();
    handleAllTodosDelete();
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        onClick={handleClickOpen}
        sx={{ "&:hover": { color: red[500], bgcolor: red[50] } }}
      >
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
