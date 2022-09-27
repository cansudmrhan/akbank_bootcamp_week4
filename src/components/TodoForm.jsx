import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import { v4 as uuid } from "uuid";
import { Row } from "react-bootstrap";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedStatu, setSelectedStatu] = useState();

  const categoryStatuses = props.categories.find(
    (category) => category.id === selectedCategory
  );

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleCategoryUpdate = (e) => {
    setSelectedCategory(e.target.value);
  };
  const handleStatuUpdate = (e) => {
    setSelectedStatu(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!props?.todo?.id) {
      const newTodo = {
        id: uuid(),
        text: input,
        categoryId: selectedCategory,
        statuId: selectedStatu,
      };
      props.onSubmit(newTodo);
    } else {
      const newTodo = {
        ...props.todo,
        text: input,
        categoryId: selectedCategory,
        statuId: selectedStatu,
      };
      props.onSubmit(newTodo);
    }
    setInput("");
    setSelectedCategory("");
  };

  useEffect(() => {
    setInput(props?.todo?.text ?? "");
    setSelectedCategory(props?.todo?.categoryId);
    setSelectedStatu(props?.todo?.statuId);
  }, [props?.todo]);

  return (
    <form className="todo-form">
      <>
        <Row className="row">
          <input
            placeholder={props?.todo?.id ? props?.todo?.text : "Add a todo"}
            value={input}
            onChange={handleChange}
            name="text"
            className="todo-input"
            ref={inputRef}
          />

          <Form.Select
            size="sm"
            className="filter-select"
            onChange={handleCategoryUpdate}
            value={selectedCategory}
          >
            <option value="">Choose Category</option>
            {props.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.text}
              </option>
            ))}
          </Form.Select>

          <Form.Select
            size="sm"
            className="filter-select"
            onChange={handleStatuUpdate}
            value={selectedStatu}
          >
            <option value="">Choose Status</option>
            {categoryStatuses &&
              categoryStatuses?.statusList?.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.text}
                </option>
              ))}
          </Form.Select>
          <button onClick={handleSubmit} className="todo-button">
            {props?.todo?.id ? "Update" : "Add"}
          </button>
          {props?.todo?.id && (
            <button onClick={props.onCancel} className="add-category-button">
              Cancel
            </button>
          )}
        </Row>
      </>
    </form>
  );
}

export default TodoForm;
