import React from "react";
import ReactDOM from "react-dom";

/* Boilerplate Rendering Code {{{ */
const ApiResult = ({ todo }) => {
  return <h4>{JSON.stringify(todo)}</h4>;
};

const Layout = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

const SelectId = ({setLoading,todoId}) => {

  const changeId = 
    (event) => {
      todoId.current = event.target.value;
      setLoading(true)
    }
  return (
    <select value={todoId.current} onChange={changeId}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>
  );
};
/* }}} */

const wait = async (ms) => new Promise((res) => setTimeout(res, ms));
const API_URL = `https://jsonplaceholder.typicode.com/todos/`;

/**
 * For example, it's very straightforward to write a custom hook that takes an 
 * ID and returns "loading" right now, kicks off a server request, and then sometime 
 * later trigger a rerender such that when it’s called with the same ID it returns 
 * the loaded value. But if the hook function is then called with a new ID, the naïve, 
 * most-obvious-to-write implementation would first return the old ID’s value, then 
 * trigger a rerender where it returns "loading", then later trigger a rerender where 
 * it returns the new loaded value.
 *
 * That one instance of being called with a new ID but returning an old value is 
 * subtle and is a potential source of bugs.
 */

/**
 * Subtle point: Even though the cache is a piece of state, we do *not* tell
 * React about it because it doesn't change what we view.
 * 
 * "What belongs in useState and what doesn't?" has no good answer; you tend
 * to find out after trial/error and experience.
 */
const cache = {};
const fetchTodo = async (todoId) => {
  const cachedResponse = cache[todoId];
  if (cachedResponse) return cachedResponse;
  const apiResponse = await window.fetch(`${API_URL}/${todoId}`);
  if (!apiResponse.ok) throw new Error("NETWORK ERROR");
  const todo = await apiResponse.json();
  cache[todoId] = todo;
  await wait(300);
  return todo;
};

const useTodo = (todoId,setLoading) => {
  const [todo, setTodo] = React.useState(null);
  
  React.useEffect(
    function setTodoEffect() {
      const getTodo = async () => {
        /**
         * From what I understand, this is where the bugs can happen: If one
         * forgets to call setTodo(null), then you still have access to the 
         * old todo while a new todo is in flight.
         *
         * This seems like a problem with using mutable state and setters/
         * getters, not a problem with React...
         */
        
        //await setLoading(true);
        //await setTodo(null); 
        const newTodo = await fetchTodo(todoId.current);
        
        await setTodo(newTodo);
        await setLoading(false);
        console.log("i ran on mount")
         
      };
      getTodo();
    },
    [todoId.current]
  );
  return { todo };
};


// Boilerplate Rendering code {{{
const App = () => {
  const todoId = React.useRef(1);
  const [loading, setLoading] = React.useState(false);
  const todo = useTodo(todoId,setLoading);
  console.log( {todoId: todoId.current, loading: loading, todo:todo});
  return (
    <Layout>
      <h1>Hello, React Semantics!</h1>
      <SelectId setLoading={setLoading} todoId={todoId} />
      <h2>Todo ID: {todoId.current}</h2>
      {loading ? <h2>Loading...</h2> : <ApiResult todo={todo} />}
    </Layout>
  );
};


  function App3(){
    const [count, setCount] = React.useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>Count : {count}</button>
  )
  }

ReactDOM.render(
    <App3/>,
  document.getElementById("root")
);

