import React from 'react';

const TodoList = ({
  todos,
  setTodos,
  updateTodo,
  overlayInputRef,
  setCurrent,
}) => {
  const handleCheckTodo = (e) => {
    const target = e.target;
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === target.id);
    // todo.complete = target.dataset.complete;
    todo.complete = !todo.complete;
    newTodos.map((obj) => newTodos.find((o) => o.id === todo.id) || todo);
    updateTodo();
  };

  const handleDeleteTodo = (e) => {
    const todo = e.target.previousSibling;
    const newTodos = [...todos];
    const thisTodo = (el) => el.id === todo.id;
    const index = todos.findIndex(thisTodo);
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleEditTodoStart = (e) => {
    const overlay = document.querySelector('.overlay');
    const currTodoText = e.target.nextSibling;
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === currTodoText.id);
    overlayInputRef.current.value = todo.name;
    setCurrent(todo.id);
    overlay.style.display = 'block';
  };

  const dragStart = (e) => {
    e.target.classList.add('dragging');
  };

  const dragEnd = (e) => {
    e.target.classList.remove('dragging');
    updateTodo();
  };

  return (
    <>
      {todos.map((todo) => {
        return (
          <div
            className='todo-wrapper'
            draggable='true'
            onDragStart={dragStart}
            onDragEnd={dragEnd}
            key={todo.id}
            style={
              todo.complete
                ? { border: '3px solid #00ff00' }
                : { border: '1px solid #fff' }
            }
          >
            <i className='fas fa-edit edit' onClick={handleEditTodoStart}></i>
            <li
              className='todo-item'
              id={todo.id}
              data-complete={todo.complete}
              onClick={handleCheckTodo}
            >
              {todo.name}
            </li>
            <i className='fas fa-times delete' onClick={handleDeleteTodo}></i>
          </div>
        );
      })}
    </>
  );
};

export default TodoList;
