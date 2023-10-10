import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  Typography,
  Select,
  MenuItem,
  ListItemText,
  OutlinedInput,
  FormControl,
  InputLabel,
  Divider,
  Stack,
} from "@mui/material";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import { v4 as uuidv4 } from "uuid";
import { sortByStatusAndDate } from "../helper/helperFunctions";
import {
  setTodoToLocalStorage,
  getTodosFromLocalStorage,
} from "../helper/localStorage";
import { filterCategoryStrings } from "../helper/helperFunctions";
import ToDo from "./Todo";
import OptionsBar from "./components/OptionsBar";

const TodoFeed = ({
  categoryArray,
  childChange,
  setChildChange,
  categoriesDataSets,
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

  const handleCategorySelectionChange = (e) => {
    // setCategoriesSelected(e.target.value);
    const {
      target: { value },
    } = e;

    setCategoriesSelected(
      // On autofill we get a stringified value.
      // typeof value === "string" ? value.split(",") : value
      value
    );
  };

  useEffect(() => {
    const todosFromStorage = getTodosFromLocalStorage();
    const totalSortedArray = sortByStatusAndDate(todosFromStorage);
    setTodoArray(totalSortedArray);
  }, [todo, childChange]);

  return (
    <Box width={"75%"}>
      <OptionsBar
        childChange={childChange}
        setChildChange={setChildChange}
        setTodoArray={setTodoArray}
      />
      <form onSubmit={handleTodoSubmit}>
        <Box
          className="form-inputs"
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
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
            <Button
              variant="outlined"
              onClick={handleTodoSubmit}
              disabled={!categoriesSelected.length}
            >
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
              renderValue={(selected) => (
                <Stack gap={1} direction="row" flexWrap="wrap">
                  {selected.map((value) => (
                    // <Chip key={value} label={value.title} />
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      m={"auto 10px"}
                    >
                      <Box
                        bgcolor={value.color.value[500]}
                        width={"15px"}
                        height={"15px"}
                        borderRadius={"50%"}
                        m={"12px"}
                      ></Box>
                      <Typography>{value.title}</Typography>
                    </Box>
                  ))}
                </Stack>
              )}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              placeholder="Select Category"
              name="color"
              value={categoriesSelected}
              label="Select Category"
              onChange={handleCategorySelectionChange}
            >
              {categoryArray.length &&
                categoryArray.map((category) => (
                  <MenuItem key={category.title} value={category}>
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
          sx={{ bgcolor: grey[400], width: "95%", borderBottomWidth: 4, m: 2 }}
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
          sx={{ bgcolor: grey[400], width: "95%", borderBottomWidth: 4, m: 2 }}
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
            width: "95%",
            borderBottomWidth: 4,
            m: 2,
          }}
        ></Divider>
      </Box>
    </Box>
  );
};

export default TodoFeed;
