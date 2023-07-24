import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";
// import { v4 as uuidv4 } from "uuid"; // Import the v4 function from the uuid library to generate unique IDs

export default function ToDoList() {
  const [inputText, setInputText] = useState(""); // State to store the input text
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("/todos")
      .then((response) => {
        console.log(response);
        setTodos(response.data); // Update the todos state with the fetched data
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleCheckbox(id) {
    // Function to handle checkbox change

    const updatedTodos = todos.map((todo) => {
      // Map over the todos array
      if (todo.id === id) {
        // If the todo has the matching ID
        console.log("map", todo.id);
        return { ...todo, done: !todo.done }; // Create a new object with the updated `done` value
      }
      return todo; // Return the unchanged todo if the ID doesn't match
    });

    setTodos(updatedTodos); // Update the todos state with the modified array
  }

  function handelInput(e) {
    setInputText(e.target.value); // Update the inputText state with the input value
  }

  // function addTodoItem() {
  //   useEffect(()=>{
  //     axios.post('/todos/:id', { todos })
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //   },[])
  //   // const newTodo = {
  //   //   id: uuidv4(), // Generate a unique ID using uuidv4()
  //   //   task: inputText, // Get the task from the inputText state
  //   //   done: false, // Set the initial done value to false
  //   // };
  //   // setTodos([...todos, newTodo]); // Add the newTodo to the todos array
  //   // setInputText(""); // Clear the inputText state
  // }

  function addTodoItem() {
    const newTodo = {
      task: inputText,
      done: false,
    };

    axios
      .post("/todos", newTodo)
      .then((response) => {
        setTodos([...todos, response.data]);
        setInputText("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteTodo(id) {
    axios.delete(`/todos/${id}/delete`).then(() => {
      const updatedTodos = todos.filter((todo) => todo.id !== id); // Filter out the todo with the matching ID
      // console.log("deleteFilter:");
      setTodos(updatedTodos); // Update the todos state with the modified array
    });
    // const updatedTodos = todos.filter((todo) => todo.id !== id); // Filter out the todo with the matching ID
    // console.log("deleteFilter:");
    // setTodos(updatedTodos); // Update the todos state with the modified array
  }

  return (
    <>
      <h2>ToDoList component 🧩 </h2>
      {todos.map((todo, index) => {
        return (
          <ToDoItem
            key={index}
            checkboxChange={handleCheckbox}
            id={todo.id}
            task={todo.task}
            done={todo.done}
            deleteTodo={deleteTodo}
          />
        );
      })}

      <div>
        <input
          type="text"
          placeholder="example text"
          value={inputText}
          onChange={(e) => handelInput(e)}
          style={{ fontSize: "20px"}}
        ></input>
        <button style={{ margin: "0 10px" }} onClick={() => addTodoItem()}>
          ADD TASK
        </button>
      </div>
    </>
  );
}
