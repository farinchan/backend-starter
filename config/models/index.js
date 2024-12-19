let model = {}

const user = require("./users")
const todo = require("./todos")

model.user = user
model.todo = todo

module.exports = model