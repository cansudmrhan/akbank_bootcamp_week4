import { useState } from "react";

import CategoryForm from "./CategoryForm";
import Categories from "./Categories";

const CategoryList = (props) => {
  const [updateId, setUpdateId] = useState("");

  const handleUpdateId = (id) => setUpdateId(id);
  const handleCancelUpdate = () => setUpdateId("");

  const handleCategoryProcess = (category) => {
    if (updateCategory) {
      props.updateCategory(category);
    } else {
      props.addCategory(category);
    }
    handleCancelUpdate();
  };

  const updateCategory = props.categories.find(
    (category) => category.id === updateId
  );

  return (
    <>
      <CategoryForm
        onSubmit={handleCategoryProcess}
        onCancel={handleCancelUpdate}
        category={updateCategory}
      />
      <Categories
        categories={props.categories}
        onOpenStatus={props.onOpenStatus}
        updateCategory={handleUpdateId}
        removeCategory={props.removeCategory}
        removeToDoByCategory={props.removeToDoByCategory}
      />
    </>
  );
};

export default CategoryList;
