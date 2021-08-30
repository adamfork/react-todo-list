import React, { useState, useRef, useEffect } from 'react';
import InputField from './components/InputField';
import TodoList from './components/TodoList';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [current, setCurrent] = useState('');
  const inputRef = useRef();
  const overlayInputRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const updateTodo = () => {
    const todoList = document.querySelector('.todo-list');
    const newTodos = [];
    for (let i = 0; i < todoList.childNodes.length; i++) {
      for (let j = 0; j < todos.length; j++) {
        if (todoList.childNodes[i].childNodes[1].id === todos[j].id) {
          newTodos.push(todos[j]);
        }
      }
    }
    setTodos([...newTodos]);
  };

  const dragOver = (e) => {
    e.preventDefault();
    const box = e.target.getBoundingClientRect();
    const offset = e.clientY - box.top - box.height / 2;
    const card = document.querySelector('.dragging');

    if (e.target.parentNode.className === 'todo-list') {
      if (offset < 0) {
        e.target.parentNode.insertBefore(card, e.target);
      } else {
        e.target.parentNode.insertBefore(card, e.target.nextSibling);
      }
    }
  };

  return (
    <>
      <div className='container'>
        <div className='wrapper'>
          <InputField
            inputRef={inputRef}
            setTodos={setTodos}
            handle='add'
            name='todo-inp'
            id='todo-inp'
          />
          <ul className='todo-list' onDragOver={dragOver}>
            <TodoList
              todos={todos}
              setTodos={setTodos}
              updateTodo={updateTodo}
              overlayInputRef={overlayInputRef}
              setCurrent={setCurrent}
            />
          </ul>
        </div>
      </div>
      <div className='overlay'>
        <div className='overlay-container'>
          <InputField
            inputRef={overlayInputRef}
            setTodos={setTodos}
            todos={todos}
            current={current}
            updateTodo={updateTodo}
            handle='edit'
            name='todo-overlay-inp'
            id='todo-overlay-inp'
          />
        </div>
      </div>
    </>
  );
};

export default App;
