import React, { useState } from "react";
import "./App.css";
import CategoryList from "./components/CategoryList";
import StatusList from "./components/StatusList";
import Filter from "./components/Filter";
import { Button } from "react-bootstrap";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      categoryId: "caf81262-71dc-4b57-9e23-8f644d8fa252",
      statuId: "03684b7b-d68a-485a-afa5-af256ad58dd7",
      text: "eğitim 1",
    },
    {
      id: 2,
      categoryId: "caf81262-71dc-4b57-9e23-8f644d8fa252",
      statuId: "17e681e9-0ab0-468d-ba21-0cdfc9950b39",
      text: "eğitim 2",
    },
    {
      id: 3,
      categoryId: "caf81262-71dc-4b57-9e23-8f644d8fa252",
      statuId: "b9771bcc-0cb6-4aed-af49-1727c0fcb6de",
      text: "eğitim 3",
    },
    {
      id: 4,
      categoryId: "3cfcc89d-df21-4e13-af8c-2f30a6be434c",
      statuId: "041e3951-5153-4c65-907f-0a7665589269",
      text: "ev işleri 1",
    },
    {
      id: 5,
      categoryId: "3cfcc89d-df21-4e13-af8c-2f30a6be434c",
      statuId: "ec2e055d-888a-4a2f-9c33-ccccac2f877e",
      text: "ev işleri 2",
    },
  ]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    setTodos([todo, ...todos]);
  };

  const updateTodo = (updated) => {
    setTodos((prevState) =>
      prevState.map((todo) => (todo.id === updated.id ? updated : todo))
    );
  };

  const removeTodo = (id) => {
    setTodos([...todos].filter((todo) => todo.id !== id));
  };

  const removeToDoByCategory = (id) => {
    setTodos([...todos].filter((todo) => todo.categoryId !== id));
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const [categories, setCategories] = useState([
    {
      id: "caf81262-71dc-4b57-9e23-8f644d8fa252",
      text: "eğitim",
      statusList: [
        {
          id: "03684b7b-d68a-485a-afa5-af256ad58dd7",
          text: "ders saati belirlendi",
          color: "blue",
        },
        {
          id: "17e681e9-0ab0-468d-ba21-0cdfc9950b39",
          text: "ders başladı",
          color: "red",
        },
        {
          id: "b9771bcc-0cb6-4aed-af49-1727c0fcb6de",
          text: "dersteyiz",
          color: "green",
        },
        {
          id: "e529d2a6-b8a3-43ea-8044-54ebc0613cac",
          text: "ders bitti ödev verildi",
          color: "pink",
        },
        {
          id: "9dcd9f01-83f5-4843-8482-f3557392facd",
          text: "ödevler kontrol edildi",
          color: "dark blue",
        },
      ],
    },
    {
      id: "3cfcc89d-df21-4e13-af8c-2f30a6be434c",
      text: "ev işleri",
      statusList: [
        {
          id: "041e3951-5153-4c65-907f-0a7665589269",
          text: "Başlanmadı",
          color: "red",
        },
        {
          id: "b75a0291-6b25-43f2-be1e-2d76356f7c1d",
          text: "Yapılıyor",
          color: "blue",
        },
        {
          id: "ec2e055d-888a-4a2f-9c33-ccccac2f877e",
          text: "Bitti",
          color: "orange",
        },
      ],
    },
  ]);

  const addCategory = (category) => {
    if (!category.text || /^\s*$/.test(category.text)) {
      return;
    }
    setCategories((prevState) => [...prevState, category]);
  };
  const updateCategory = (updated) => {
    setCategories((prevState) =>
      prevState.map((category) =>
        category.id === updated.id ? updated : category
      )
    );
  };
  const removeCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const [showCategories, setShowCategories] = useState(false);
  const handleClose = () => setShowCategories(false);
  const handleOpen = () => setShowCategories(true);
  const showHideClassName = showCategories ? "display-block" : "display-none";

  const [showStatus, setshowStatus] = useState(false);
  const [selectedEditCategoryId, setselectedEditCategoryId] = useState(null);
  const handleCloseStatus = () => setshowStatus(false);
  const handleOpenStatus = (categoryId) => {
    setshowStatus(true);
    setselectedEditCategoryId(categoryId);
  };
  const showHideStatusClassName = showStatus ? "display-block" : "display-none";

  const handleAddCategoryStatus = (statu) => {
    const category = categories.find((c) => c.id === selectedEditCategoryId);
    updateCategory({
      ...category,
      statusList: [...category.statusList, statu],
    });
  };
  const handleDeleteStatu = (statuId) => {
    const category = categories.find((c) => c.id === selectedEditCategoryId);
    const nextStatuIndex = category.statusList.findIndex(
      (statu) => statu.id === statuId
    );
    const updatedStatuList = category.statusList.filter(
      (statu) => statu.id !== statuId
    );
    updateCategory({
      ...category,
      statusList: updatedStatuList,
    });
    let nextStatuId = updatedStatuList?.[nextStatuIndex]?.id;
    if (nextStatuId) {
      todos.forEach((todo) => {
        if (todo.statuId === statuId) {
          updateTodo({
            ...todo,
            statuId: nextStatuId,
          });
        }
      });
    }
  };
  const handleUpdateCategoryStatus = (updated) => {
    const category = categories.find((c) => c.id === selectedEditCategoryId);

    updateCategory({
      ...category,
      statusList: category.statusList.map((statu) =>
        statu.id === updated.id ? updated : statu
      ),
    });
  };

  return (
    <div className="todo-app">
      <h1>What's the Plan for Today?</h1>
      <Filter
        todos={todos}
        addTodo={addTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        completeTodo={completeTodo}
        categories={categories}
      />
      <Button onClick={handleOpen} className="edit-categories-button">
        {" "}
        Edit Categories{" "}
      </Button>
      <div className={showHideClassName}>
        <div className="modal" id="modal">
          <CategoryList
            onOpenStatus={handleOpenStatus}
            addCategory={addCategory}
            updateCategory={updateCategory}
            removeToDoByCategory={removeToDoByCategory}
            removeCategory={removeCategory}
            categories={categories}
          />
          <button onClick={handleClose} className="close-categories-button">
            Back to ToDos
          </button>
        </div>
      </div>
      <div className={showHideStatusClassName}>
        <div className="modal" id="modal">
          <StatusList
            selectedCategory={categories.find(
              (category) => category.id === selectedEditCategoryId
            )}
            addCategoryStatus={handleAddCategoryStatus}
            updateCategoryStatus={handleUpdateCategoryStatus}
            onDeleteStatus={handleDeleteStatu}
          />
          <button
            onClick={handleCloseStatus}
            className="close-categories-button"
          >
            {" "}
            Back to Categories
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
