import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const InputField = ({
  inputRef,
  setTodos,
  handle,
  todos,
  current,
  updateTodo,
  name,
  id,
}) => {
  const handleAddTodo = () => {
    const todoText = inputRef.current.value;

    if (todoText === '') return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: todoText, complete: false }];
    });
    inputRef.current.value = null;
  };

  const handleEditTodoEnd = (e) => {
    const overlay = document.querySelector('.overlay');
    overlay.style.display = 'none';
    const currText = inputRef.current.value;
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === current);
    todo.name = currText;
    newTodos.map((obj) => newTodos.find((o) => o.id === todo.id) || todo);
    updateTodo();
  };

  return (
    <div className='input-container'>
      <input ref={inputRef} className='input' type='text' name={name} id={id} />
      <button
        type='button'
        className='add-btn'
        onClick={
          handle === 'add'
            ? handleAddTodo
            : handle === 'edit'
            ? handleEditTodoEnd
            : null
        }
      >
        <i className='fas fa-plus'></i>
      </button>
    </div>
  );
};

export default InputField;
