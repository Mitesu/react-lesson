import React, {useEffect} from  "react";
import TodoList from "./todo/todolist";
import Context from "./context";
import Loader from "./Loader";
import Modal from "./modal/Modal";

const AddTodo = React.lazy(() => import("./todo/addTodo"))

function App() {
    const [todos, setTodos] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then(response => response.json())
            .then(todos => {
                setTimeout(()=> {
                        setTodos(todos);
                        setLoading(false);
                },2000)
            });
    },[]);
    function toggleTodo(id) {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        }))

    }
    function removeTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }
    function adddTodo(title) {
        setTodos(todos.concat([{
            title,
            id: Date.now(),
            complited: false,
        }]))
    }
  return (
      <Context.Provider value={{
          removeTodo
      }}>
      <div className="dv">
        <h1>React tutorial</h1>
          <Modal />

          <React.Suspense fallback={<p>Loading...</p>}>
              <AddTodo onCreate={adddTodo}/>
          </React.Suspense>


          {loading && <Loader />}
          {todos.length ?
              (
                  <TodoList todos={todos} onToggle={toggleTodo} />
                  ) : (
                      loading ? null : (<p>No Todos!</p>)
              )
          }

      </div>
      </Context.Provider>
  );
}

export default App;
