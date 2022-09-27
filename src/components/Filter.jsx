import React, { useEffect, useState } from "react";
import { Row, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import TodoList from "./TodoList";

const Filter = (props) => {
  const [filteredTodos, setFilteredTodos] = useState();
  const [filteredCategory, setFilteredCategory] = useState("");
  const [filteredStatu, setFilteredStatu] = useState("");

  const applyFilters = () => {
    if (!filteredCategory && !filteredStatu) {
      return setFilteredTodos(null);
    }

    let todos;
    if (filteredCategory !== "") {
      todos = props.todos.filter((todo) => todo.categoryId === filteredCategory);
    }

    if (filteredStatu !== "") {
      todos = (todos ?? props.todos).filter(
        (todo) => todo.statuId === filteredStatu
      );
    }

    setFilteredTodos(todos);
  };

  const handleChangeCategory = (e) => {
    setFilteredCategory(e.target.value);
    setFilteredStatu("");
  };

  const handleChangeStatu = (e) => {
    setFilteredStatu(e.target.value);
  };

  const handleClearFilter = () => {
    setFilteredCategory("");
    setFilteredStatu("");
  };

  useEffect(() => {
    if (!filteredCategory && !filteredStatu) {
      setFilteredTodos(null);
    }
  }, [filteredCategory, filteredStatu]);

  const isFiltered = filteredCategory !== "";

  return (
    <>
      <Row>
        <Form.Select
          size="sm"
          className="filter-select"
          onChange={handleChangeCategory}
          value={filteredCategory}
        >
          <option value={""}>Choose Category</option>
          {props.categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.text}
            </option>
          ))}
        </Form.Select>

        <Form.Select
          size="sm"
          className="filter-select"
          value={filteredStatu}
          onChange={handleChangeStatu}
        >
          <option value={""}>Choose Status</option>
          {filteredCategory &&
            props.categories
              .find((category) => category.id === filteredCategory)
              .statusList.map((statu) => (
                <option key={statu.id} value={statu.id}>
                  {statu.text}
                </option>
              ))}
        </Form.Select>

        <Button onClick={applyFilters} className="filter-button">
          Filter
        </Button>
        <Button onClick={handleClearFilter} className="filter-button">
          Clean Filters
        </Button>
      </Row>

      <TodoList
        {...props}
        todos={filteredTodos || props.todos}
        isFiltered={isFiltered}
      />
    </>
  );
};

export default Filter;
