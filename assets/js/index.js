let app;
let updateTodo = async response => {
  app.todos = await response.json();
};

app = new Vue({
  el: '#app',
  data: {
    message: 'Lista de afazeres!',
    editMessage: '',
    editIndex: -1,
    edit: false,
    todos: []
  },
  mounted: function() {
    const url = '/todos/';
    fetch(url, { method: 'GET' }).then(updateTodo);
  },
  methods: {
    // PAGE
    showEditModal: function(index) {
      this.edit = true;
      this.editIndex = index;
      this.editMessage = this.todos[index].text;
    },
    closeEditModal: function() {
      this.edit = false;
      this.editIndex = -1;
      this.editMessage = '';
    },

    // TODO-LIST CRUD
    addTodo: function() {
      if (this.message === '') {
        return;
      }

      const url = `/todos/?todo=${this.message}`;
      fetch(url, { method: 'POST' }).then(updateTodo);

      this.message = '';
    },

    editTodo: function() {
      if (this.editMessage === '' || this.editIndex === -1) {
        return;
      }
      const url = `/todos/?index=${this.editIndex}&text=${this.editMessage}`;
      fetch(url, { method: 'PUT' }).then(updateTodo);

      this.editIndex = -1;
      this.editMessage = '';
      this.edit = false;
    },

    removeTodo: function(index) {
      const url = `/todos/?todo=${index}`;
      fetch(url, { method: 'DELETE' }).then(updateTodo);
    },

    removeAllTodos: function() {
      const url = '/todos/all';
      fetch(url, { method: 'DELETE' }).then(updateTodo);
    },

    // TODO-LIST Sorts
    sortAlphabetically: function() {
      const url = '/todos/sort/alphabetically';
      fetch(url, { method: 'POST' }).then(updateTodo);
    },
    sortByCreationDate: function() {
      const url = '/todos/sort/creationDate';
      fetch(url, { method: 'POST' }).then(updateTodo);
    }
  }
});
