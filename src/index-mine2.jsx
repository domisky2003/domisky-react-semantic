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

const App = () => {
    const [todoId, setTodoId] = React.useState("1");
    const loading = React.useRef(false)
    const todo = React.useRef(1)
    
    React.useEffect(
    () => {
       
        todo.current = todoId
        //loading.current = true
        //todo.current =null; 
        console.log(" useeffect todoId "+todoId)
        console.log(todo.current)
        //const newTodo = todoId// await fetchTodo(todoId);
        //todo.current = newTodo;
        console.log(todo.current)
        //loading.current = false;
         console.log("i executed useeffect")
     
    },
    [todoId]
  );
  
  const changeId = 
    (event) => {
      setTodoId(event.target.value);
    }
    console.log( {todoId: todoId, loading: loading.current, todo : todo.current});
    return (
      <Layout>
        <h1>Hello, React Semantics!</h1>
        <select value={todoId} onChange={changeId}>
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
        
        <h2>Todo ID: {todoId}</h2>
        {loading.current? <h2>Loading...</h2> : <ApiResult todo={todo.current} />}
      </Layout>
    );
  };
  
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );