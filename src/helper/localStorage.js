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
