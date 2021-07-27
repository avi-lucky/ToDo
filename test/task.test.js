const request = require('supertest')
const app = require('../app')
const User = require('../src/models/user')
const Task = require('../src/models/task')
const db = require('../src/db/mongoose')

const userOne = {
    name: 'Suraj Yadav',
    email: 'suraj@example.com',
    password: 'Suraj200!'
}

beforeAll(async () => {
    await User.deleteMany()
})

var token, user

// signUp user
test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: userOne.name,
        email: userOne.email,
        password: userOne.password
    })
    .expect((res) => {(res.body.user)})
    .expect(201)
})

// login user
test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    })
    .expect(200)
    .expect((res) => {token = res.body.token, user = res.body.user})
})

const taskOne = {
   description: 'Shopping Done.',
   completed: false
}

const taskTwo = {
   description: 'Message Delivered.',
   completed: true
}

var id

// create new task
test('Should create task for user', async () => {
    const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${token}`)
    .send({
        description: taskOne.description,
        completed: taskOne.completed
    })
    .expect(201)
    const task = await Task.findById(response.body._id)
    id = response.body._id
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

// should read task
test('Should read all task', async () => {
    const response = await request(app).get('/tasks')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    expect(response.body[0].description).toEqual(taskOne.description)
})

// should update task
test('Should update a task', async () => {
    // console.log(typeof 'taskTwo')
    // console.log(id)
    // console.log(typeof id)

     const response = await request(app).patch(`/tasks/${id}`)
     .set('Authorization', `Bearer ${token}`)
     .send({
        description: taskTwo.description,
        completed: taskTwo.completed
    })
    .expect(200)
    expect(response.body.description).toEqual(taskTwo.description)
    expect(response.body.completed).toEqual(taskTwo.completed)
})

// delete task
test('Should delete a task', async () => {
    const response = await request(app)
    .delete(`/tasks/${id}/delete`)
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200);
})

// logout user
test('Should logout existing user', async () => {
    await request(app)
    .post('/users/logout')
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200)
})