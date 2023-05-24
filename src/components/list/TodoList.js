import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFilteredTodos } from "../../redux/todos/todosSlice";
import {
  deleteTodoAsync,
  getTodosAsync,
  toggleTodoAsync,
} from "../../redux/todos/todosServices";
import Loading from "../content/Loading";
import Error from "../content/Error";

function TodoList() {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);
  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Emin Misiniz ?")) {
      await dispatch(deleteTodoAsync(id));
    }
  };
  const handleToogle = async (id, completed) => {
    await dispatch(toggleTodoAsync({ id, data: { completed } }));
  };
  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return <Error message={error} />;
  }
  return (
    <>
      <ul className="todo-list">
        {filteredTodos.map((item) => (
          <li key={item.id} className={item.completed ? "completed" : ""}>
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                checked={item.completed}
                onChange={() => {
                  handleToogle(item.id, !item.completed);
                }}
              />
              <label>{item.title}</label>
              <button
                className="destroy"
                onClick={() => {
                  handleDelete(item.id);
                }}
              ></button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;
