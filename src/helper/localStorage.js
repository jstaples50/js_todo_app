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
