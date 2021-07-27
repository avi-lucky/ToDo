const http = require('http')
const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
bodyParser = require('body-parser').json()
const router = new express.Router()

router.use(bodyParser)

// create new task
router.post('/tasks', auth, async (req, res) => {
    const task = new Task ({
        // ...req.body,
        description: req.body.description,
        completed: req.body.completed,
        owner: req.user._id
    })
    // console.log(res.user)
    // console.log(req.body)
    // console.log(req.body.description)
    // console.log(typeof res.body)
    // console.log(res.body)
    // console.log(req.user.email)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// read all tasks
router.get('/tasks', auth, async (req, res) => {
    try {
        const task = await Task.find({ owner: req.user._id })
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

// find task by Id
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

// update task 
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})
        // if(task.owner == req.user.email){
        //     updates.forEach((update) => task[update] = req.body[update])
        //     await task.save()
        // }
        // else if(task.owner != req.user.email){
        //     return res.status(400).send(e)
        // }
        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// delete task
router.delete('/tasks/:id/delete', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router