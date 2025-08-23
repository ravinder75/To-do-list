document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');
  const counter = document.getElementById('todo-counter');
  const progressBar = document.getElementById('progress-bar');

  let todos = JSON.parse(localStorage.getItem('todos_dark')) || [];

  function saveTodos() {
    localStorage.setItem('todos_dark', JSON.stringify(todos));
  }

  function renderTodos() {
    list.innerHTML = '';
    let completed = 0;
    todos.forEach((todo, idx) => {
      if (todo.completed) completed++;
      const li = document.createElement('li');
      li.className = 'todo-item' + (todo.completed ? ' completed' : '');
      li.innerHTML = `
        <span>${todo.text}</span>
        <div class="todo-actions">
          <button class="complete-btn" title="Mark as done">&#10003;</button>
          <button class="delete-btn" title="Delete">&#10005;</button>
        </div>
      `;
      // Complete button
      li.querySelector('.complete-btn').onclick = () => {
        todos[idx].completed = !todos[idx].completed;
        saveTodos();
        renderTodos();
      };
      // Delete button
      li.querySelector('.delete-btn').onclick = () => {
        todos.splice(idx, 1);
        saveTodos();
        renderTodos();
      };
      list.appendChild(li);
    });
    // Counter
    counter.textContent = `${completed} / ${todos.length}`;
    // Progress bar
    progressBar.style.width = todos.length === 0 ? '0%' : `${(completed / todos.length) * 100}%`;
  }

  form.onsubmit = (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
      todos.push({ text, completed: false });
      saveTodos();
      renderTodos();
      input.value = '';
      input.focus();
    }
  };

  renderTodos();
});