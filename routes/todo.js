const {Router} = require('express')
const Sequelize = require('sequelize')
const Todo = require('../models/todo')
const router = Router()

// Get all todos
router.get('/', async(req, res) => {
    try {
        const todos = await Todo.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        })
        res.status(200).json(todos)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

// Create new todo
router.post('/', async(req, res) => {
    try {
        const todo = await Todo.create({
            title: req.body.title
        })
        res.status(201).json({
            todo
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

// Complete todo
router.put('/:id', async(req, res) => {
    try {
        const todo = await Todo.findByPk(+req.params.id)
        todo.done = !todo.done
        await todo.save()
        res.status(200).json(todo)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

// Delete todo
router.delete('/:id', async(req, res) => {
    try {
        await Todo.destroy({
            where: {
                id: +req.params.id
            }
        })
        res.status(204).json({})
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

module.exports = router