import React from 'react'

const TodoItem = ({ todo, token, todos, setTodos, setError }) => {
    const { content, completed, _id } = todo

    const handleChange = async () => {
        try {
            const updateData = await fetch(`http://localhost:5000/api/todo/${_id}`, {
            method: 'PATCH',
            body: JSON.stringify({completed: !completed}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            const updateDataJSON = await updateData.json()
            if (!updateDataJSON.ok) {
                throw new Error(updateDataJSON.message)
            }
        const { todo } = updateDataJSON
        const index = todos.findIndex(item => item._id === _id)
        const newArr = [...todos]
        newArr[index] = todo
        setTodos(newArr)
        } catch (e) {
            setError(e.message || 'Something went wrong.')
        }
           
    }

    const deleteHandler = async () => {
        try {
            const deleteData = await fetch(`http://localhost:5000/api/todo/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        await deleteData.json()
            if (!deleteData.ok) {
            throw new Error(deleteData.message)
        }
        const newArr = todos.filter(item => item._id !== _id)
        setTodos(newArr)
        } catch (e) {
            setError(e.message || 'Something went wrong')
        }
        

    }

    return (
        <div>
            <p>{content}</p>
            <button onClick={handleChange}>{completed ? 'Not completed' : 'Completed'}</button>
            <button onClick={deleteHandler}>Delete</button>
        </div>
    )
}

export default TodoItem
