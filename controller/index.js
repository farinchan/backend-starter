const controller = {}

//inisialisasi controller yang dibuat kesini
const auth = require("./auth")
const profile = require("./profile")
const example = require("./example")
const todos = require("./todos")

controller.auth = auth;
controller.profile = profile;
controller.example = example;
controller.todos = todos;



module.exports = controller