import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTodos } from '../features/todos/todo-slice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorder } from '../hooks/ReOrder'
import axios from 'axios'
import { useQuery, useMutation} from 'react-query';



const TodoCard = ({ setNewTodo }) => {
    
    const todos = useSelector((state) => state.todos);

    const dispatch = useDispatch();

    const updateTodosMutation = useMutation(async (updatedTodos) => {
        const response = await axios.post('/api/todos', updatedTodos);
        return response.data;
      });

    async function fetchPosts() {
        const { data } = await axios.get('/api/todos')
        return data
    }

    const { data, error, isError, isLoading } = useQuery('posts', fetchPosts);


    const handleDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const sourceDroppableId = result.source.droppableId;
        const destinationDroppableId = result.destination.droppableId;

        if (sourceDroppableId !== destinationDroppableId) {

            const { source: { index } } = result;
            const deletedTodo = todos[index];
            const updatedTodos = todos.filter((item) => item.id !== deletedTodo.id);
            dispatch(setTodos(updatedTodos));
            updateTodosMutation.mutate(updatedTodos);
        } else {

            const reorderedTodos = reorder(
                todos,
                result.source.index,
                result.destination.index
            );
            dispatch(setTodos(reorderedTodos));
            updateTodosMutation.mutate(reorderedTodos);
        }
    };

    const deleteTodo = (todo) => {
        const updatedTodos = todos.filter((item) => item.id !== todo.id);
        dispatch(setTodos(updatedTodos));
        updateTodosMutation.mutate(updatedTodos);
    };

    useEffect(() => {

        dispatch(setTodos(data));
    }, [data, dispatch]);

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error! {error.message}</div>
    }
    return (

        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex py-8 h-full w-full">
                <Droppable droppableId="todos1">
                    {(provided1) => (
                        <div
                            className="md:w-[25%] w-[15%] h-full flex gap-8 flex-col items-center justify-center bg-transparent"
                            {...provided1.droppableProps}
                            ref={provided1.innerRef}
                        >
                              <h1 className='text-transparent h-[100px] w-full'>asd</h1>
                            <div className='text-white w-full h-[700px] flex justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-40 h-40">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            </div>
                            {provided1.placeholder}
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="todos">
                    {(provided) => (
                        <div
                            className="md:w-[50%] w-[70%] flex gap-8 flex-col items-center justify-center bg-black rounded-xl py-8 "
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {todos.map((todo, index) => (
                                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                                    {(provided) => (
                                        <div
                                            className="md:w-2/4 w-3/4 md:h-32 46 text-white font-bold border-2 rounded-xl flex flex-col p-6"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <h1 className=''>ID: {todo.id}</h1>
                                            <h1>Title: {todo.title}</h1>
                                            <h1>Task: {todo.task}</h1>
                                            <button
                                                onClick={() => { deleteTodo(todo) }}
                                                className=' h-8 bg-red-500'>Completed</button>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            <button
                                onClick={() => { setNewTodo(true) }}
                                className='w-32 h-8 bg-green-700 text-white font-bold px-4'>Add A Todo</button>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="todos2">
                    {(provided1) => (
                        <div
                            className="md:w-[25%] w-[15%] h-full flex gap-8 flex-col items-center justify-center bg-transparent"
                            {...provided1.droppableProps}
                            ref={provided1.innerRef}
                        >
                            <h1 className='text-transparent h-[100px] w-full'>asd</h1>
                            <div className='text-white w-full h-[700px] flex justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-40 h-40">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            </div>

                            {provided1.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
};

export default TodoCard;
