import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [todoList, setTodoList] = useState([])

  const handleChange = e => {
    setName(e.target.value)
  }

  const handleDate = e => {
    setDate(e.target.value)
  }

  const addItemInList = () => {
    setTodoList((items) => {
      return [...items, { description: name, date: date, done: false, id: (items || []).length + 1 }]
    })
  }

  const handleDoneStatus = item => {
    setTodoList(list => list.map(listItem => listItem.id === item.id ? ({ ...listItem, done: !item.done }) : listItem))
  }

  const handleDeleteItemClick = item => {
    setTodoList(list => list.filter(listItem => listItem.id !== item.id))
  }

  return (
    <div clsssName="container">
      <h1>To Do List</h1>
      <h4>Add Items</h4>
      <div className="add-name-form">
        <input type="text" value={name} onChange={handleChange} />
        <input type="date" onChange={handleDate} />
        <button className="add-button" onClick={addItemInList}>Add</button>
      </div>
      {(todoList || []).map((item) => (
        <div className={`todo-item ${item.done ? 'item-completed' : ''} ${new Date(item.date) < new Date() ? 'due-date-message' : ''}`} key={item.id}>
          <input type="checkbox" name="completed" checked={item.done} onChange={() => handleDoneStatus(item)} />
          <div className="todo-description">{item.description}</div>
          <div className="todo-date">
            {item.date}</div>
          <div className={`due-date`}>{new Date(item.date) < new Date() ? 'Due day is passed' : !item.done ? `${Math.round(((new Date(item.date) - new Date()) / (1000 * 60 * 60 * 24)))} days left` : '' } </div>
          <button onClick={() => handleDeleteItemClick(item)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;