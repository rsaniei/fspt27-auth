import React, { useState } from "react";

export default function NewTaskForm({ addTaskCb }) {
  let [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTaskCb(text);
    setText("");
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          New Task:
          <input
            type="text"
            name="text"
            value={text}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
