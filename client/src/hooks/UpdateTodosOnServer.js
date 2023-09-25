 export const updateTodosOnServer = async (updatedTodos) => {
    try {
        const response = await fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTodos),
        });

        if (!response.ok) {
            console.error('Failed to update todos on the server:', response.status);
        }
    } catch (error) {
        console.error('Error updating todos on the server:', error);
    }
};