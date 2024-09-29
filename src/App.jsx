import { useEffect, useState } from "react";
import { TodoList } from "./components/TodoList";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage on component mount
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  // Save todos to localStorage whenever todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim() !== "") {
      setTodos([...todos, todo]);
      setTodo("");
    }
  };

  //to delete
  const handleDelete = (updatedTodos) => {
    setTodos(updatedTodos);
  };

  return (
    <>
      <div className="sticky top-0 bg-slate-800">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-green-400 rounded-md box-decoration-slice h-16 tracking-tighter sticky top-0">
          Todo App
        </h1>
        <form
          onSubmit={handleSubmit}
          className=" mx-4 sm:mx-8 md:mx-16 lg:mx-32  my-4 flex  fex-col sm:flex-row gap-2 sm:gap-4  "
        >
          <input
            placeholder="Add Todo..."
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            value={todo}
            className=" flex-grow h-12 sm:h-14 content-center rounded-md bg-gray-300 text-gray-800 basis-3/4 w-1/4 focus:outline-none p-4 text-lg sm:text-xl "
          />
          <button
            type="submit"
            className="basis-1/4 bg-sky-500 rounded-md mx-2 active:bg-blue-900 duration-500 text-lg sm:text-xl px-6 py-3 font-semibold  "
          >
            save
          </button>
        </form>
      </div>

      <div>
        <TodoList todos={todos} onDelete={handleDelete} />
      </div>
    </>
  );
}

export default App;
