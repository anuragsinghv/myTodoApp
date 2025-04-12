let todos = [
    { id: 1, text: "Learn Node.js", done: false },
    { id: 2, text: "Build a project", done: false }
  ];
  
  module.exports = {
    getTodos: () => todos,
  
    addTodo: (text) => {
      const newTodo = {
        id: Date.now(),
        text,
        done: false
      };
      todos.push(newTodo);
      return newTodo;
    },
  
    toggleTodo: (id) => {
      const todo = todos.find(t => t.id == id);
      if (!todo) return null;
      todo.done = !todo.done;
      return todo;
    },
  
    deleteTodo: (id) => {
      const index = todos.findIndex(t => t.id == id);
      if (index === -1) return false;
      todos.splice(index, 1);
      return true;
    }
  };
  