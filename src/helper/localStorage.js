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

export const createSavedTodosInLocalStorage = () => {
  const todoArray = getTodosFromLocalStorage();
  localStorage.setItem(`Todo-${uuidv4()}`, JSON.stringify(todoArray));
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
