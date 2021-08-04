const http = require('http');
const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth');
const router = new express.Router()

// sign up user
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// login user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()  
    }
})

// read login profile
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
 })

// update profile
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// logout user
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send("Logged Out")
    } catch (e) {
        res.status(500).send()
    }
})

// forgot password
router.patch('/users/forgot', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    // try {
    //     updates.forEach((update) => req.user[update] = req.body[update])
    //     await req.user.save()
    //     res.send(req.user)
    // } catch (e) {
    //     res.status(400).send(e)
    // }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        // const user = await User.findByCredentials(req.body.email)
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router