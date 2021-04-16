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

const SelectId = ({ id, setId }) => {
  const changeId = React.useCallback(
    (event) => {
      setId(event.target.value);
    },
    [setId]
  );
  return (
    <select value={id} onChange={changeId}>
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

const API_URL = `https://jsonplaceholder.typicode.com/todos/`;

const wait = async (ms) => new Promise((res) => setTimeout(res, ms));

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

const useCachedTodo = (id) => {
  const [loading, setLoading] = React.useState(false);
  const [todo, setTodo] = React.useState(null);
  React.useEffect(
    function setTodoEffect() {
      const getTodo = async () => {
        await setLoading(true);
        await setTodo(null); 
        const newTodo = await fetchTodo(id);
        await setTodo(newTodo);
        await setLoading(false);
      };
      getTodo();
    },
    [id]
  );
  return { loading, todo };
};

const App = () => {
  const [todoId, setTodoId] = React.useState("1");
  const { loading, todo } = useCachedTodo(todoId);
  console.log({ loading, todo });
  return (
    <Layout>
      <h1>Hello, React Semantics!</h1>
      <SelectId id={todoId} setId={setTodoId} />
      {loading ? <h2>Loading...</h2> : <ApiResult todo={todo} />}
    </Layout>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
