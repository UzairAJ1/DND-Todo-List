import React, { useState, useEffect } from 'react';
import { setTodos } from '../features/todos/todo-slice';
import { useDispatch } from 'react-redux';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios'
const NewTodo = ({ setNewTodo }) => {
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [task, setTask] = useState('');
  const [allTodos, setAllTodos] = useState([]);

  const newTodo = {
    id: id,
    title: title,
    task: task,
  };

  async function fetchPosts() {
    const { data } = await axios.get('/api/todos');
    return data;
  }

  const updateTodosMutation = useMutation(async (updatedTodos) => {
    const response = await axios.post('/api/todos', updatedTodos);
    return response.data;
  });

  const { data} = useQuery('posts', fetchPosts);

  const save = () => {

    const updatedAllTodos = [...allTodos, newTodo];
    setAllTodos(updatedAllTodos);
    dispatch(setTodos(updatedAllTodos));
    updateTodosMutation.mutate(updatedAllTodos);
    setNewTodo(false)

    setId('');
    setTitle('');
    setTask('');

  }

  useEffect(() => {
    setAllTodos(data);

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
