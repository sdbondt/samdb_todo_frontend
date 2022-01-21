import React, { useState } from "react";

const AddTodo = ({ token, setTodos, setError }) => {
  const [contentInput, setContentInput] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const postData = await fetch("http://localhost:5000/api/todo", {
        method: "POST",
        body: JSON.stringify({ content: contentInput }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const postDataJSON = await postData.json();
      if (!postDataJSON.ok) {
        throw new Error(postDataJSON.message);
      }
      const { todo } = postDataJSON;
      setTodos((prevState) => [todo, ...prevState]);
      setContentInput("");
    } catch (e) {
      setError(e.message || "Something went wrong.");
    }
  };

  const inputHandler = (e) => {
    setContentInput(e.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="todo">Add Todo</label>
      <br />
      <input
        type="text"
        id="todo"
        onChange={inputHandler}
        value={contentInput}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;
