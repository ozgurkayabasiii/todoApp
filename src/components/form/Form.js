import { useState } from "react";
import { addTodosAsync } from "../../redux/todos/todosServices";
import { useDispatch,useSelector } from "react-redux";
import Loading from "../content/Loading"
import Error from "../content/Error"
function Form() {
  const [title, setTitle] = useState('');
  const isLoading=useSelector((state)=>state.todos.addNewTodo.isLoading);
  const error=useSelector((state)=>state.todos.addNewTodo.error);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    if(!title) return;
    e.preventDefault();
   await dispatch(addTodosAsync({title}));
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} style={{display:'flex',alignItems:'center'}}>
      <input
      disabled={isLoading}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {isLoading &&
      <Loading />
       }
      {error && <Error message={error}/>}
    </form>
  );
}

export default Form;
