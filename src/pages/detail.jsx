import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { FiCheck, FiTrash2, FiEdit } from "react-icons/fi";
import { useState } from "react";

const Detail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState("");

  const title = searchParams.get("title");
  const isDone = searchParams.get("is-done");

  const onClickIsDone = () => {
    const localTodos = localStorage.getItem("todos");

    if (!localTodos) return;

    const poarsedTodos = JSON.parse(localTodos);

    const updatedTodos = poarsedTodos.map((v) => {
      if (v.id === +id) return { id: v.id, title: v.title, isDone: !v.isDone };
      else return v;
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    navigate("/");
  };

  const onClickEditToggle = () => {
    setIsEdit(!isEdit);
  };

  const onClickIsDel = () => {
    const localTodos = localStorage.getItem("todos");

    if (!localTodos) return;

    const parsedTodos = JSON.parse(localTodos);

    const deletedTodos = parsedTodos.filter((v) => {
      if (v.id !== +id) return v;
    });

    if (deletedTodos.length === 0) localStorage.removeItem("todos");
    else localStorage.setItem("todos", JSON.stringify(deletedTodos));

    navigate("/");
  };

  const onSubmitEdit = (e) => {
    e.preventDefault();

    if (!editTodo) return;

    const localTodos = localStorage.getItem("todos");

    if (!localTodos) return;

    const poarsedTodos = JSON.parse(localTodos);

    const updatedTodos = poarsedTodos.map((v) => {
      if (v.id === +id) return { id: v.id, title: editTodo, isDone: v.isDone };
      else return v;
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    navigate("/");
  };

  return (
    <div className="bg-blue-100 min-h-screen flex justify-center items-center">
      <span>{id}</span>
      <span className="ml-4">
        {isEdit ? (
          <form className="flex" onSubmit={onSubmitEdit}>
            <input
              className="border-2 focus:outline-none focus:border-blue-300 mr-3 px-2 py-1"
              type="text"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
            <input className="hover:font-bold" type="submit" value="확인" />
          </form>
        ) : (
          title
        )}
      </span>
      <button
        onClick={onClickIsDone}
        className=" bg-green-400 hover:bg-green-600 active:bg-green-400 rounded-md px-2 h-10 flex justify-center items-center ml-4"
      >
        <FiCheck className="mr-2" /> {isDone === "true" ? "취소" : "완료"}
      </button>
      <button
        onClick={onClickEditToggle}
        className=" bg-blue-400 hover:bg-blue-600 active:bg-blue-400 rounded-md px-2 h-10 flex justify-center items-center ml-4"
      >
        <FiEdit className="mr-2" /> {isEdit ? "취소" : "수정"}
      </button>
      <button
        onClick={onClickIsDel}
        className=" bg-red-400 hover:bg-red-600 active:bg-red-400 rounded-md px-2 h-10 flex justify-center items-center ml-4"
      >
        <FiTrash2 className="mr-2" /> 삭제
      </button>
    </div>
  );
};

export default Detail;
