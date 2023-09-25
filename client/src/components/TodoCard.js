import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTodos } from '../features/todos/todo-slice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {updateTodosOnServer} from '../hooks/UpdateTodosOnServer'
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const TodoCard = ({ setNewTodo }) => {
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchTodos() {
            try {
                const response = await fetch('/api/todos');
                if (response.ok) {
                    const data = await response.json();
                    dispatch(setTodos(data)); 
                } else {
                    console.error('Failed to fetch data:', response.status);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchTodos();
    }, [dispatch]);

   
    const handleDragEnd = (result) => {
        if (!result.destination) {
           
            const { source: { index } } = result;
            const deletedTodo = todos[index];

            const updatedTodos = todos.filter((item) => item.id !== deletedTodo.id);

           
            dispatch(setTodos(updatedTodos));
            updateTodosOnServer(updatedTodos);
            

        } else {
            const reorderedTodos = reorder(
                todos,
                result.source.index,
                result.destination.index
            );

            dispatch(setTodos(reorderedTodos));
            updateTodosOnServer(reorderedTodos);
        }
    };

    const deleteTodo = (todo) => {
        const updatedTodos = todos.filter((item) => item.id !== todo.id);
        dispatch(setTodos(updatedTodos));
        updateTodosOnServer(updatedTodos);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todos">
                {(provided) => (
                    <div
                        className="w-full h-full flex gap-8 flex-col items-center justify-center"
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
                                            className=' h-8 bg-red-500'>Delete</button>
                                    </div>
                                )}
                            </Draggable>
                        ))}

                        <button
                            onClick={() => { setNewTodo(true) }}
                            className='w-24 h-8 bg-green-700 text-white'>Add A Todo</button>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>

        
    );
};

export default TodoCard;
