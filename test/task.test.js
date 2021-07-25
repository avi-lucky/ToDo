const request = require('supertest')
const app = require('../app')
const Task = require('../src/models/task')
const db = require('../src/db/mongoose')

const taskOne = {
   description: 'Shopping Done.',
   completed: false
}

const taskTwo = {
   description: 'Message Delivered.',
   completed: true
}

beforeAll(async () => {
    await Task.deleteMany()
})

var id

// create new task
test('Should create task for user', async () => {
    const response = await request(app)
    .post('/tasks')
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
    .expect(200)
    expect(response.body[0].description).toEqual(taskOne.description)
})

// should update task
test('Should update a task', async () => {
    // console.log(typeof 'taskTwo')
    // console.log(id)
    // console.log(typeof id)

     const response = await request(app).patch(`/tasks/${id}`)
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
    .delete(`/tasks/${id}`)
    .send()
    .expect(200);
})