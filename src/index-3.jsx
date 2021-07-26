import React, {useState, useEffect, useRef} from 'react'
import ReactDOM from "react-dom";
function App(){
    const [name,setName] = useState("")
    const renderName = useRef("")
    const renderCount = useRef(1)

    useEffect(()=>{
       // console.log(name)
        //renderName.current = name
        renderCount.current = renderCount.current+1
        console.log(renderCount.current)
    })
    function changeName(event){
        setName(event.target.value)
    }
   // console.log("am here")
    return(
        <>
        <input value={name.current} onChange={changeName}/>
        <div>my name is {name.current}</div>
        <div>i rendered {renderCount.current} times</div>
        </>
    )
}

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );