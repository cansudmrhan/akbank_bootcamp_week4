import React, { useState, useEffect } from "react";
import StatusForm from "./StatusForm";
import Status from "./Status";
import { v4 as uuid } from "uuid";
import colorNames from "colornames";

const StatusList = (props) => {
  const [statuInput, setStatuInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [hexValue, setHexValue] = useState("");
  const [isDarkText, setIsDarkText] = useState(true);

  const [updateId, setUpdateId] = useState("");

  const handleUpdateId = (id) => setUpdateId(id);
  const handleCancelUpdate = () => setUpdateId("");

  const handleStatuProcess = (statu) => {
    if (updateId) {
      props.updateCategoryStatus(statu);
    } else {
      props.addCategoryStatus(statu);
    }
    handleCancelUpdate();
    setStatuInput("");
    setColorInput("");
    setHexValue("");
    setIsDarkText(!isDarkText);
  };

  const handleChange = (e) => {
    setStatuInput(e.target.value);
  };
  const handleColorChange = (e) => {
    setColorInput(e.target.value);
    setHexValue(colorNames(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (statuInput.trim() === "" || colorInput.trim() === "") {
      return;
    }
    if (!updateId) {
      handleStatuProcess({
        id: uuid(),
        text: statuInput,
        color: colorInput,
      });
    } else {
      handleStatuProcess({
        id: updateId,
        text: statuInput,
        color: colorInput,
      });
    }
  };

  const updateStatu = props?.selectedCategory?.statusList?.find(
    (statu) => statu.id === updateId
  );

  useEffect(() => {
    setStatuInput(updateStatu?.text ?? "");
    setColorInput(updateStatu?.color ?? "");
  }, [updateStatu]);

  return (
    <>
      <StatusForm
        statu={updateStatu}
        colorInput={colorInput}
        statuInput={statuInput}
        onChange={handleChange}
        onColorChange={handleColorChange}
        onSubmit={handleSubmit}
        onCancel={handleCancelUpdate}
      />
      <Status
        colorInput={colorInput}
        statuInput={statuInput}
        hexValue={hexValue}
        isDarkText={isDarkText}
        status={props?.selectedCategory?.statusList || []}
        removeStatu={props.onDeleteStatus}
        updateStatu={handleUpdateId}
      />
    </>
  );
};

export default StatusList;
