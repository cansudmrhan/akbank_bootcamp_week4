import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

const Categories = (props) => {
  const [showCategories, setShowCategories] = useState(false);
  const handleClose = () => setShowCategories(false);
  const handleOpen = () => setShowCategories(true);
  const showHideClassName = showCategories ? "display-block" : "display-none";

  return props.categories.map((category) => (
    <div className="todo-row" key={category.id}>
      <div>{category.text}</div>
      <div className="todo-actions">
        <button
          key={category.id}
          className="edit-status-button"
          onClick={() => props.onOpenStatus(category.id)}
        >
          Edit Status
        </button>
        <div className="icons">
          <RiCloseCircleLine onClick={handleOpen} className="delete-icon" />
          <TiEdit
            onClick={() => props.updateCategory(category.id)}
            className="edit-icon"
          />
        </div>
      </div>

      <div className={showHideClassName}>
        <div className="yesnomodal" id="modal">
          <h2>
            Are you sure all todos and statuses belonging to this category will
            be deleted?
          </h2>
          <button
            onClick={() => {
              props.removeCategory(category.id);
              props.removeToDoByCategory(category.id);
              handleClose();
            }}
            className="yes"
          >
            YES
          </button>
          <button onClick={handleClose} className="no">
            NO
          </button>
        </div>
      </div>
    </div>
  ));
};

export default Categories;
