import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

const Todo = ({
  categories,
  todos,
  completeTodo,
  removeTodo,
  updateTodo,
  isFiltered,
}) => {
  const getCategory = (categoryId) => {
    return categories.find((category) => category.id === categoryId);
  };

  if (!todos.length) {
    if (isFiltered) {
      return <h1>Nothing found for this filters!</h1>;
    }

    return <h1>No todos yet!</h1>;
  }

  return todos?.map((todo) => {
    const category = getCategory(todo.categoryId);
    const statu = category?.statusList?.find(
      (statu) => statu.id === todo.statuId
    ) || { color: "red", text: "unknown" };

    return (
      <div
        key={todo.id}
        className={todo.isComplete ? "todo-row complete" : "todo-row"}
        style={{ background: statu.color }}
      >
        <div key={todo.id} onClick={() => completeTodo(todo.id)}>
          {todo.text}
        </div>
        <span>{category.text}</span>
        <span>{statu.text}</span>
        <div className="icons">
          <RiCloseCircleLine
            onClick={() => removeTodo(todo.id)}
            className="delete-icon"
          />
          <TiEdit onClick={() => updateTodo(todo.id)} className="edit-icon" />
        </div>
      </div>
    );
  });
};

export default Todo;
