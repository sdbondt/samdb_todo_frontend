import React from 'react'
import TodoItem from './TodoItem'

const TodoList = ({ todos, token, setTodos, setError }) => {
    if(todos.length >0){
    return (
        <div>
            {todos.map((todo, i) => {
                return <TodoItem key={i} todo={todo} token={token} todos={todos} setTodos={setTodos} setError={setError} />
            })}
        </div>
        )
    } else {
        return <p>No todos</p>
    }
}

export default TodoList
