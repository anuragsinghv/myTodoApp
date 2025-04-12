const API_URL = "/api/todos";
const input = document.getElementById('todoInput');
const list = document.getElementById('todoList');
const signal = document.getElementById('signal');
let todos = [];
let activeIndex = -1;

async function fetchTodos() {
  const res = await fetch(API_URL);
  todos = await res.json();
  renderTodos();
}

function renderTodos() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    if (todo.done) li.classList.add('done');
    if (index === activeIndex) li.classList.add('active');

    li.onclick = () => toggleTodo(todo.id);

    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTodo(todo.id);
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

async function addTodo() {
  const text = input.value.trim();
  if (!text) return;
  
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });

  input.value = '';
  showSignal();
  fetchTodos();
}

function showSignal() {
  signal.style.display = 'block';
  setTimeout(() => {
    signal.style.display = 'none';
  }, 1500);
}

async function toggleTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: 'PUT' });
  fetchTodos();
}

async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchTodos();
}

input.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    await addTodo();
    input.focus();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') {
    activeIndex = Math.min(activeIndex + 1, todos.length - 1);
    renderTodos();
  } else if (e.key === 'ArrowUp') {
    activeIndex = Math.max(activeIndex - 1, 0);
    renderTodos();
  } else if (e.key === 'Enter' && activeIndex !== -1 && document.activeElement !== input) {
    toggleTodo(todos[activeIndex].id);
  }
});

fetchTodos();
