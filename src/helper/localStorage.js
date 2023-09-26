import { v4 as uuidv4 } from "uuid";

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

// Get saved Todos under saved name

export const getAndSaveTodoListFromLocalStorage = (listName) => {
  const savedTodoList = localStorage.getItem(listName)
    ? JSON.parse(localStorage.getItem(listName))
    : [];
  localStorage.setItem("Todos", JSON.stringify([...savedTodoList]));
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

export const createSavedTodosInLocalStorage = (listName) => {
  const todoArray = getTodosFromLocalStorage();
  localStorage.setItem(listName, JSON.stringify(todoArray));
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
      const newCategories = oldCategories.concat(categoryArray);
      t.categories = newCategories;
    }
    return t;
  });
  localStorage.setItem("Todos", JSON.stringify(newTodoArray));
};
