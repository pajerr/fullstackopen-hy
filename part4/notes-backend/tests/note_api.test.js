const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
//superagent object
const api = supertest(app)

const Note = require('../models/note')

beforeEach(async () => {
  await Note.deleteMany({})

  let noteObject = new Note(helper.initialNotes[0])
  await noteObject.save()

  noteObject = new Note(helper.initialNotes[1])
  await noteObject.save()
})

//100000 sets timeout to 100 seconds to ensure test don't fail due to time it takes to run
test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two notes', async () => {
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('the first note is about HTTP methods', async () => {
  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd[0].content).toBe('HTML is easy')
})

test('all notes are returned', async () => {
  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
  // const response = await api.get('/api/notes')
  // expect(response.body).toHaveLength(initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map((r) => r.content)
  expect(contents).toContain('Browser can execute only Javascript')
})

test('a valid note can be added', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)
  const contents = notesAtEnd.map((n) => n.content)
  expect(contents).toContain('async/await simplifies making async calls')
  /*
  const response = await api.get('/api/notes')

  const contents = response.body.map((r) => r.content)

  expect(response.body).toHaveLength(initialNotes.length + 1)
  expect(contents).toContain('async/await simplifies making async calls')
  */
})

test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api.post('/api/notes').send(newNote).expect(400)

  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
})

afterAll(() => {
  mongoose.connection.close()
})
