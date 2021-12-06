import './App.css';
import AllPosts from "./pages/AllPosts"
import SinglePosts from "./pages/SinglePosts";
import Form from "./pages/Form";
import "milligram"
import {Route, Routes, Link, useNavigate } from "react-router-dom"

import {useState, useEffect} from "react"

/////////////////////////
// Style Object
/////////////////////////
const h1 = {
  textAlign: "center",
  margin: "10px"
}

const button = {
  backgroundColor: "navy",
  display: "block",
  margin: "auto"
}

function App() {

  ///////////////////////////
  // State and Other Variables
  ///////////////////////////

  const navigate = useNavigate()

const url = "https://masonite-todos.herokuapp.com/todos/"


// state to hold list of todos
  const [posts, setPosts] = useState([])

// an empty todo for initializing the create form
  const nullTodo = {
      subject: "",
      details: ""
    }
  const [targetTodo, setTargetTodo] = useState(nullTodo)

//////////////
// Functions
//////////////

 // function to get list of todos from API
 const getTodos = async () => {
  const response = await fetch(url);
  const data = await response.json();
  setPosts(data);
};

// Function to add To-do's
const addTodos = async (newTodo)=> {
  const response = await fetch(url, {
    method: "post",
    headers: {
    "Content-type": "application/json"
  },
  body: JSON.stringify(newTodo)
  })
  getTodos()
}
const getTargetTodo = (todos) => {
  setTargetTodo(todos)
  navigate("/edit")
}

// update todo for our handlesubmit prop
  const updateTodo = async (todo) => {
    await fetch(url + todo.id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

  //update our todos
    getTodos();
  };
const deleteTodo = async (todo) => {
  await fetch(url + todo.id, {
    method: "delete"
  })
  getTodos()
  navigate("/")
}

  //////////////
  // useEffects
  //////////////
useEffect(()=>{
  getTodos()
},[])

  return (
    <div className="App">
      <h1 style={h1}>My Todo List</h1>
      <Routes>
        <Route path="/" element={<AllPosts posts={posts}/>}/>
        <Route path="/post/:id" element={<SinglePosts posts={posts}
        edit={getTargetTodo}
        deleteTodo={deleteTodo} 
        />}/>
        <Route path="/new" element={<Form
          initialTodo={nullTodo}
          handleSubmit={addTodos}
          buttonLabel="Create Todo"
        />}/>
        <Route path="/edit" element={<Form
            initialTodo={targetTodo}
            handleSubmit={updateTodo}
            buttonLabel="Update Todo"
        />}/>
      </Routes>
    </div>

  );
}

export default App;
