import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

const Status = (props) => {
  return props.status.map((statu) => (
    <div
      className="todo-row"
      key={statu.id}
      style={{
        background: statu.color,
        color: props.isDarkText ? "#000" : "#FFF",
      }}
    >
      <div>{statu.text}</div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => props.removeStatu(statu.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => props.updateStatu(statu.id)}
          className="edit-icon"
        />
      </div>
    </div>
  ));
};

export default Status;
