import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {updateTodosOnServer} from '../hooks/UpdateTodosOnServer'
const NewTodo = ({ setNewTodo }) => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [allTodos, setAllTodos] = useState([]);
console.log(allTodos)
  const newTodo = {
    id: id,
    title: title,
    task: task,
  };

  

  const save = () => {
    window.location.reload();
    const updatedAllTodos = [...allTodos, newTodo];

   
    setAllTodos(updatedAllTodos);

   
    updateTodosOnServer(updatedAllTodos);

    
    setId("");
    setTitle("");
    setTask("");
  }

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch('/api/todos');
        if (response.ok) {
          const data = await response.json();
          setAllTodos(data);
        } else {
          console.error('Failed to fetch data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchTodos();
  }, []);

  return (
    <div className='w-full h-full  bg-[#444654] flex flex-col items-center justify-center gap-6 text-white rounded-2xl'>
      <div>
        <h1 className='w-24'>Enter Id</h1>
        <input
          className='px-4 text-black'
          placeholder='id'
          value={id}
          onChange={(e) => { setId(e.target.value) }}
        ></input>
      </div>

      <div>
        <h1 className='w-24'>Enter Title</h1>
        <input
          className='px-4 text-black'
          placeholder='Title'
          value={title}
          onChange={(e) => { setTitle(e.target.value) }}
        ></input>
      </div>

      <div>
        <h1 className='w-24'>Enter Task</h1>
        <input
          className='px-4 text-black'
          placeholder='Task'
          value={task}
          onChange={(e) => { setTask(e.target.value) }}
        ></input>
      </div>
      <button onClick={save} className='bg-black w-24 h-8'>Save</button>
      <button className='bg-black w-24 h-8' onClick={() => { setNewTodo(false) }}>Cancel</button>
    </div>
  );
};

export default NewTodo;
