const notesRouter = require('express').Router()
const Note = require('../models/note')

//As all of the asynchronous operations are currently done inside of a function, it is enough to change the route handler functions into async functions.
notesRouter.get('/', async (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

notesRouter.post('/', async (request, response) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })
  //catch block calls next function to pass request to error handler middleware
  const savedNote = await note.save()
  response.status(201).json(savedNote)
})
/* promise version
  note
    .save()
    .then((savedNote) => {
      response.status(201).json(savedNote)
    })
    .catch((error) => next(error))*/

//express-async-errors sends errors to error handler middleware
notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote)
    })
    .catch((error) => next(error))
})

//The module exports the router to be available for all consumers of the module.
module.exports = notesRouter
