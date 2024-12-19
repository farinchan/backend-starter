const model = require("../config/models/index")
const validation = require("../helpers/validation")

let controller = {}

controller.index = async function (req, res) {

    let result = await model.todo.findAll()
    res.json({
        messsage: "success",
        result
    })

};

controller.store = async (req, res) => {

    const title = req.body.title
    const description = req.body.description
    const deadline = req.body.deadline

    const validationError = validation.TodosValidation(req.body).error
    if (validationError) return res.status(400).json({ message: validationError.details[0].message })

    const result = await model.todo.create({
        title,
        description,
        deadline,
        userId: req.user.user_id
    })

    res.json({
        messsage: "success",
        result
    })

};

controller.show = async (req, res) => {

    const id = req.params.id

    const result = await model.todo.findByPk(id)
    res.json({
        messsage: "success",
        result
    })

};

controller.update = async (req, res) => {

    const id = req.params.id

    const title = req.body.title
    const description = req.body.description

    const todo = await model.todo.findByPk(id)
    todo.title = title
    todo.description = description
    todo.save()

    res.json({
        messsage: "success",
        result: todo
    })

};

controller.destroy = async (req, res) => {

    const id = req.params.id

    const todo = await model.todo.findByPk(id)
    todo.destroy()

    res.json({
        messsage: "success",
        result: todo
    })

};

module.exports = controller;
