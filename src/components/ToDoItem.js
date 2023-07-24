import React from "react";

const ToDoItem = React.memo(
  ({ id, task, done, checkboxChange, deleteTodo }) => {
    const handleDelete = () => {
      deleteTodo(id);
    };
    return (
      <li
        style={{
          backgroundColor: "#80808036",
          width: "300px",
          color: "green",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "25px 0",
          padding: "10px 10px",
          borderRadius: "10px",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        }}
      >
        <input
          style={{ margin: "5px"}}
          onChange={() => checkboxChange(id)}
          checked={done}
          type="checkbox"
        />
        <span style={{ 
          textDecoration: done ? "line-through" : "none",
          fontSize: "25px",
          marginLeft: "10px",
          }}>
          {task}
        </span>
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          onClick={handleDelete}
        >
          <img
            src="/assets/recycle-bin.png"
            alt="Delete"
            style={{ width: "16px", height: "16px" }}
          />
        </button>
      </li>
    );
  }
);

export default ToDoItem;
