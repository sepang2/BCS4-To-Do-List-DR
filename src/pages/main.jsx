import { useEffect, useState } from "react";
import CreateTodo from "../components/CreateTodo";
import TodoCard from "../components/TodoCard";

const Main = () => {
  const [todos, setTodos] = useState([]);
  const [lastTodoId, setLastTodoId] = useState(0);

  const getTodos = () => {
    const localTodos = localStorage.getItem("todos");

    if (!localTodos) return;

    const parsedTodos = JSON.parse(localTodos);
    setTodos(parsedTodos);

    setLastTodoId(parsedTodos[parsedTodos.length - 1].id);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <main className=" min-h-screen max-w-screen-md mx-auto">
      <h1 className="text-center text-4xl font-bold py-12">To do list</h1>
      <CreateTodo todos={todos} getTodos={getTodos} lastTodoId={lastTodoId} />
      <ul className="w-96 mx-auto mt-12 h-[30rem] overflow-y-auto">
        {todos.length === 0 ? (
          <span className="flex justify-center font-bold text-blue-500 text-3xl">
            MISSION COMPLETE !
          </span>
        ) : (
          todos.map((v, i) => {
            return <TodoCard key={i} todo={v} />;
          })
        )}
      </ul>
    </main>
  );
};

export default Main;
