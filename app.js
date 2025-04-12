const express = require('express');
const app = express();
const todoRoutes = require('./routes/todoRoutes');

app.use(express.json()); // allows JSON body
app.use('/api/todos', todoRoutes);


app.use(express.static('public'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
