const StatusForm = (props) => {
  return (
    <>
      <input
        name="text"
        placeholder={props?.statu?.id ? props?.statu?.text : "Add a statu"}
        className="add-statu-input"
        value={props.statuInput}
        onChange={props.onChange}
      />
      <input
        name="text"
        placeholder={
          props?.statu?.id ? props?.statu?.color : "Add a colorname or hex code"
        }
        className="add-color-input"
        value={props.colorInput}
        onChange={props.onColorChange}
      />
      <button onClick={props.onSubmit} className="add-category-button">
        {props?.statu?.id ? "Update" : "Add"}
      </button>
      {props?.statu?.id && (
        <button onClick={props.onCancel} className="add-category-button">
          Cancel
        </button>
      )}
    </>
  );
};

export default StatusForm;
