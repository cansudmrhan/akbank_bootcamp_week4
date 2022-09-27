import { useState } from "react";

import TodoForm from "./TodoForm";
import Todo from "./Todo";

function TodoList({
  categories,
  addTodo,
  isFiltered,
  todos,
  completeTodo,
  removeTodo,
  updateTodo,
}) {
  const [updateId, setUpdateId] = useState("");

  const handleUpdateId = (id) => setUpdateId(id);
  const handleCancelUpdate = () => setUpdateId("");

  const handleTodoProcess = (todo) => {
    if (updateId) {
      updateTodo(todo);
    } else {
      addTodo(todo);
    }
    handleCancelUpdate();
  };

  const todoToUpdate = todos.find((todo) => todo.id === updateId);

  return (
    <>
      <TodoForm
        todo={todoToUpdate}
        categories={categories}
        onSubmit={handleTodoProcess}
        onCancel={handleCancelUpdate}
      />
      <Todo
        isFiltered={isFiltered}
        todos={todos}
        categories={categories}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={handleUpdateId}
      />
    </>
  );
}

export default TodoList;
