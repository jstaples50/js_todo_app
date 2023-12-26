import { v4 as uuidv4 } from "uuid";
import { filteredCategoriesToAdd } from "./helperFunctions";

export const setTodoToLocalStorage = (todo) => {
  const todoArray = getTodosFromLocalStorage();
  todoArray.length
    ? localStorage.setItem("Todos", JSON.stringify([...todoArray, todo]))
    : localStorage.setItem("Todos", JSON.stringify([todo]));
};

export const getTodosFromLocalStorage = () => {
  const todoArray = localStorage.getItem("Todos")
    ? JSON.parse(localStorage.getItem("Todos"))
    : [];
  return todoArray;
};

export const updateTodoStatus = (todo, newStatus) => {
  const todoArray = getTodosFromLocalStorage();
  const newTodoArray = todoArray.filter((t) => t.id !== todo.id);
  const newObj = { status: newStatus };
  todo = { ...todo, ...newObj };
  localStorage.setItem("Todos", JSON.stringify([...newTodoArray, todo]));
};

export const updateTodoPriority = (todo) => {
  const todoArray = getTodosFromLocalStorage();

  const newTodoArray = todoArray.map((t) => {
    if (t.id === todo.id) {
      if (t.highPriority === true) {
        return {
          ...t,
          highPriority: false,
        };
      } else {
        return {
          ...t,
          highPriority: true,
        };
      }
    } else {
      return t;
    }
  });
  localStorage.setItem("Todos", JSON.stringify(newTodoArray));
};

export const deleteTodo = (todo) => {
  const todoArray = getTodosFromLocalStorage();
  const newTodoArray = todoArray.filter((t) => t.id !== todo.id);
  localStorage.setItem("Todos", JSON.stringify(newTodoArray));
};

export const deleteAllTodos = () => {
  localStorage.removeItem("Todos");
};

export const updateTodoText = (todo, text) => {
  const todoArray = getTodosFromLocalStorage();
  const newTodoArray = todoArray.map((t) => {
    if (t.id === todo.id) {
      return {
        ...t,
        text: text,
      };
    } else {
      return t;
    }
  });
  localStorage.setItem("Todos", JSON.stringify(newTodoArray));
};

// CATEGORIES

export const getCategoriesFromLocalStorage = () => {
  const categoryArray = localStorage.getItem("Categories")
    ? JSON.parse(localStorage.getItem("Categories"))
    : [];
  return categoryArray;
};

export const setCategoryToLocalStorage = (category) => {
  const categoryArray = getCategoriesFromLocalStorage();
  categoryArray.length
    ? localStorage.setItem(
        "Categories",
        JSON.stringify([...categoryArray, category])
      )
    : localStorage.setItem("Categories", JSON.stringify([category]));
};

export const updateTodoCategories = (todo, category) => {
  const todoArray = getTodosFromLocalStorage();
  const newTodoArray = todoArray.map((t) => {
    if (t.id === todo.id) {
      const filteredCategories = t.categories.filter(
        (c) => c.title !== category.title
      );
      t.categories = filteredCategories;
    }
    return t;
  });
  localStorage.setItem("Todos", JSON.stringify(newTodoArray));
};

export const addTodoCategory = (todo, categoryArray) => {
  const todoArray = getTodosFromLocalStorage();
  const newTodoArray = todoArray.map((t) => {
    if (t.id === todo.id && categoryArray.length) {
      const oldCategories = t.categories;
      const newCategories = filteredCategoriesToAdd(t, categoryArray);
      const concatCategories = oldCategories.concat(newCategories);
      t.categories = concatCategories;
    }
    return t;
  });

  localStorage.setItem("Todos", JSON.stringify(newTodoArray));
};

// Saving Todo List/Getting Todo List

export const createSavedTodosInLocalStorage = (listName) => {
  const savedTodoLists = localStorage.getItem("SavedTodoLists")
    ? JSON.parse(localStorage.getItem("SavedTodoLists"))
    : [];
  const todoArray = getTodosFromLocalStorage();
  let savedTodoArray = { dateCreated: Date() };
  savedTodoArray[listName] = todoArray;
  localStorage.setItem(
    "SavedTodoLists",
    JSON.stringify([...savedTodoLists, savedTodoArray])
  );
};

export const getSavedTodoListsNamesFromLocalStorage = () => {
  const savedTodoLists = localStorage.getItem("SavedTodoLists")
    ? JSON.parse(localStorage.getItem("SavedTodoLists"))
    : [];
  if (savedTodoLists !== undefined) {
    const todoListNames = savedTodoLists.map((list) => Object.keys(list)[1]);
    // console.log(todoListNames);
    return todoListNames;
  } else return;
};

export const getAndSaveTodoListFromLocalStorage = (listName) => {
  const savedTodoLists = localStorage.getItem("SavedTodoLists")
    ? JSON.parse(localStorage.getItem("SavedTodoLists"))
    : [];

  // console.log(savedTodoList[listName]);
  const pickedList = savedTodoLists.filter((list) => list[listName]);
  // console.log(pickedList);
  const renderedListFromPickedList = pickedList[0][listName];
  console.log(renderedListFromPickedList);
  localStorage.setItem(
    "Todos",
    JSON.stringify([...renderedListFromPickedList])
  );
};

// Get previous Saved List
export const saveMyCurrentTodos = () => {
  const savedTodoList = localStorage.getItem("9-26-23_2")
    ? JSON.parse(localStorage.getItem("9-26-23_2"))
    : [];
  localStorage.setItem("Todos", JSON.stringify([...savedTodoList]));
};
