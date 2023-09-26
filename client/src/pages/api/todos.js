// pages/api/todos.js

let todos = [
  { id: 1, title: "Todo 1",task:"work on DND" },
  { id: 2, title: "Todo 2",task:"work on Redux" },
  { id: 3, title: "Todo 3",task:"work on Api's" },
  { id:4, title:"Todo 4", task:"completed the project"}
];

export default (req, res) => {
  if (req.method === 'POST') {
    try {
      const updatedTodos = req.body; 
      todos = updatedTodos; 
      res.status(200).json(updatedTodos); 
    } catch (error) {
      console.error('Error updating todos:', error);
      res.status(500).json({ error: 'Failed to update todos' });
    }
  } else if (req.method === 'GET') {
    res.status(200).json(todos); 
  } else {
    res.status(405).end();
  }
};
