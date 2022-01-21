import { useEffect, useState } from 'react';
import './App.css';
import AuthForm from './components/auth/AuthForm';
import AddTodo from './components/todos/AddTodo';
import TodoList from './components/todos/TodoList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [todos, setTodos] = useState([])
  

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userdata'))
    const {token, user} = storedData
    if (storedData.token) {
      setToken(token)
      setUser(user)
      setIsLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    if (!isLoggedIn) {
      setTodos([])
    } else {
      const fetchTodos = async () => {
        const data = await fetch('http://localhost:5000/api/todo/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        const jsonData = await data.json()
        return jsonData
      }
      
      fetchTodos().then(data => setTodos(data.todos))
    }
  }, [isLoggedIn, token ])

  if (!isLoggedIn) {
    return <AuthForm setIsLoggedIn={setIsLoggedIn} setToken={setToken} setUser={setUser} setError={setError} />
  }

  const logoutHandler = () => {
    setIsLoggedIn(false)
  }
  
  if (isLoggedIn) {
    return (
      <div className="App">
        {error && <p>{error}</p>}
        <button onClick={logoutHandler}>Logout</button><br />
        <p>{user.name}</p>
        <AddTodo token={token} setTodos={setTodos} setError={setError} />
        <TodoList todos={todos} token={token} setTodos={setTodos} setError={setError} />
      </div>
    );
  }
  
}

export default App;
