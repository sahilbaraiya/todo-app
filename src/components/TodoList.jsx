import React, { useState } from "react";

export const TodoList = (props) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");
  const [checkStatus, setCheckStatus] = useState(props.todos.map(() => false));

  const deleteTodo = (idx) => {
    const updatedTodos = props.todos.filter((todo, index) => index !== idx);
    props.onDelete(updatedTodos);
  };

  const handleUpdateClick = (todo, idx) => {
    setEditIndex(idx);
    setEditValue(todo);
  };

  const updateTodo = (idx) => {
    if (editValue.trim() !== "") {
      const updatedTodos = [...props.todos];
      updatedTodos[idx] = editValue.trim();
      props.onDelete(updatedTodos);
      setEditIndex(-1);
    }
  };

  const cancelUpdate = () => {
    setEditIndex(-1);
  };

  const handleCheck = (idx) => {
    const updatedCheckStatus = [...checkStatus];
    updatedCheckStatus[idx] = !updatedCheckStatus[idx];
    setCheckStatus(updatedCheckStatus);
  };

  return (
    <>
      <div>
        <div className="container mx-auto px-4 sm:px-8 lg:px-16">
          {props.todos.map((todo, index) => (
            <div key={index}>
              {editIndex === index ? (
                <div className="flex flex-col sm:flex-row items-center gap-2  bg-gray-200 p-4 rounded-md shadow-md ">
                  <input
                    value={editValue}
                    type="text"
                    onChange={(e) => {
                      setEditValue(e.target.value);
                    }}
                    className="h-12 w-full sm:w-auto flex-grow text-lg sm:text-xl bg-gray-500 rounded-md font-normal outline-none p-2 sm:p-4 animate-pulse "
                  />
                  <div className="flex flex-row">
                    <button
                      className="h-12 w-20 mx-2 rounded-md bg-green-500 active:bg-green-900 duration-900 px-4 py-2"
                      onClick={() => updateTodo(index)}
                    >
                      save
                    </button>
                    <button
                      onClick={cancelUpdate}
                      className="h-12 w-20  rounded-md bg-gray-500 active:bg-gray-900 duration-500 mx-2 px-4 py-2 "
                    >
                      cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 bg-orange-300 p-4 md:m-4 sm:m-2 rounded-md shadow-md mb-2 "
                >
                  <input
                    type="checkbox"
                    onChange={() => handleCheck(index)}
                    checked={checkStatus[index]}
                    className=" cursor-pointer h-6 w-6 accent-green-500 "
                  />
                  <p
                    className={`flex-grow text-xl font-semibold ${
                      checkStatus[index] ? "blur-sm" : ""
                    }  rounded-md break-words ml-2  `}
                  >
                    {todo}
                  </p>

                  <div className="flex gap-2 mt-2 sm:mt-0 sm:ml-2">
                    <button
                      onClick={() => handleUpdateClick(todo, index)}
                      className={`h-8 w-8 mx-2 rounded-md p-2`}
                      disabled={`${checkStatus[index] ? "disabled:" : ""}`}
                    >
                      🖋️
                    </button>
                    <button
                      onClick={() => {
                        deleteTodo(index);
                      }}
                      className="h-8 w-8 mx-2 rounded-md p-2"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
