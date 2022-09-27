import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

const CategoryForm = (props) => {
  const [categoryInput, setCategoryInput] = useState("");

  const handleChange = (e) => {
    setCategoryInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!props?.category?.id) {
      props.onSubmit({
        id: uuid(),
        text: categoryInput,
        statusList: [],
      });
    } else {
      props.onSubmit({
        ...props.category,
        text: categoryInput,
      });
    }

    setCategoryInput("");
  };

  useEffect(() => {
    setCategoryInput(props?.category?.text ?? "");
  }, [props?.category?.text]);

  return (
    <>
      <input
        placeholder={
          props?.category?.id ? props?.category?.text : "Add a category"
        }
        value={categoryInput}
        onChange={handleChange}
        name="text"
        className="add-category-input"
      />
      <button onClick={handleSubmit} className="add-category-button">
        {props?.category?.id ? "Update Category" : "Add New Category"}
      </button>
      {props?.category?.id && (
        <button onClick={props.onCancel} className="add-category-button">
          Cancel Update
        </button>
      )}
    </>
  );
};

export default CategoryForm;
