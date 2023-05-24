import {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeActiveFilter,
  clearCompleted,
  selecTodos,
  selectActiveFilter
} from "../../redux/todos/todosSlice";
function ContentFooter() {
  const items = useSelector(selecTodos);
  const itemsLeft = items.filter((item) => !item.completed).length;

  const activeFilter = useSelector(selectActiveFilter);
  const dispatch = useDispatch();

  useEffect(()=>{
    localStorage.setItem('activeFilter',activeFilter)

  },[activeFilter])
  return (
    <>
      <footer className="footer">
        <span className="todo-count">
          <strong>{itemsLeft}</strong>
          {itemsLeft > 1 ? "  items left" : "  item left"}
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              onClick={() => dispatch(changeActiveFilter("all"))}
              className={activeFilter === "all" ? "selected" : ""}
            >
              All
            </a>
          </li>
          <li>
            <a
              href="#/"
              onClick={() => dispatch(changeActiveFilter("active"))}
              className={activeFilter === "active" ? "selected" : ""}
            >
              Active
            </a>
          </li>
          <li>
            <a
              href="#/"
              onClick={() => dispatch(changeActiveFilter("completed"))}
              className={activeFilter === "completed" ? "selected" : ""}
            >
              Completed
            </a>
          </li>
        </ul>

        <button
          className="clear-completed"
          onClick={() => dispatch(clearCompleted())}
        >
          Clear completed
        </button>
      </footer>
    </>
  );
}

export default ContentFooter;
