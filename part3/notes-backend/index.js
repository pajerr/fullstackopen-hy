require('dotenv').config()
const express = require('express')
const app = express()

//Note variable will be assigned to the same object that the module defines.
const Note = require('./models/note')
var morgan = require('morgan')

const middleware = morgan('tiny')

const cors = require('cors')
app.use(cors())

app.use(express.static('build'))

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2022-01-10T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2022-01-10T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2022-01-10T19:20:14.298Z',
    important: true
  }
]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
/*
const mongoose = require('mongoose')
const url = process.env.MONGO_URI

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//const Note = mongoose.model('Note', noteSchema)
*/
app.use(express.json())

app.use(requestLogger)

app.use(middleware)

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  //The note objects are created with the Note constructor function
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })
  //The response is sent inside of the callback function for the save operation.
  //This ensures that the response is sent only if the operation succeeded.
  note.save().then((savedNote) => {
    response.json(savedNote)
  })
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter((note) => note.id !== id)

  response.status(204).end()
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find((note) => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
