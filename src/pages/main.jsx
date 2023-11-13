import { useEffect, useState } from "react";
import CreateTodo from "../components/CreateTodo";

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
    <main className=" bg-red-100 min-h-screen max-w-screen-md mx-auto">
      <h1 className="bg-blue-100 text-center text-4xl font-bold py-12">
        To do list
      </h1>
      <CreateTodo todos={todos} getTodos={getTodos} lastTodoId={lastTodoId} />
      <ul className="bg-green-100 w-96 mx-auto mt-12 h-[30rem] overflow-y-auto">
        {todos.length === 0 ? (
          <span className="flex justify-center font-bold text-blue-500 text-3xl">
            MISSION COMPLETE !
          </span>
        ) : (
          todos.map((v, i) => {
            return (
              <li key={i} className="h-12 flex items-center text-xl">
                <span className="w-1/12 text-right">{v.id}</span>
                <span className="w-8/12 pl-2">{v.title}</span>
                <button className="w-3/12 hover:font-bold">Detail</button>
              </li>
            );
          })
        )}
      </ul>
    </main>
  );
};

export default Main;
