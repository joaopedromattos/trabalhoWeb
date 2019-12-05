let fs = require("fs");
let path = require("path");
let dbPath = path.resolve(__dirname, "database");
let todos = [];

module.exports = {
  getTodo: function(req, res) {
    res.json(todos);
  },

  addTodo: async function(req, res) {
    let text = req.param("todo");

    let curTodo = {
      text,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    };

    todos.push(curTodo);
    Todo.create(curTodo);

    await Todo.create(curTodo);
    res.json(todos);
  },

  editTodo: async function(req, res) {
    let index = req.param("index");
    let text = req.param("text");
    todos[index].text = text;
    todos[index].updatedAt = new Date().getTime();

    await Todo.update({ text: text }).set({
      text: text,
      updatedAt: todos[index].updatedAt
    });

    save();
    res.json(todos);
  },

  deleteTodo: async function(req, res) {
    let index = req.param("todo");
    await Todo.destroyOne({ text: todos[index].text });
    todos.splice(index, 1);
    save();
    res.json(todos);
  },

  deleteAllTodos: async function(req, res) {
    todos = [];
    await Todo.delete();
    save();
    res.json(todos);
  },

  sortTodoAlphabetically: function(req, res) {
    todos.sort((a, b) => {
      return a.text > b.text ? 1 : -1;
    });
    save();
    res.json(todos);
  },

  sortTodoByCreationDate: function(req, res) {
    todos.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });
    save();
    res.json(todos);
  }
};
