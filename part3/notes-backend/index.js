const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
//Note variable will be assigned to the same object that the module defines.

const Note = require('./models/note')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)
//app.use(middleware)

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
  return maxId + 1
}

app.post('/api/notes', (request, response, next) => {
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
  note
    .save()
    .then((savedNote) => {
      response.json(savedNote)
    })
    .catch((error) => next(error))
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    /*If the format of the id is incorrect, then we will end up in the error handler defined in 
the catch block. The appropriate status code for the situation is 400 Bad Request*/
    //If the next function is called with a parameter, then the execution will continue to the error handler middleware.
    .catch((error) => next(error))
  /*
    .catch((error) => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
    */
})
/*
There is one important detail regarding the use of the findByIdAndUpdate method. By default,
 the updatedNote parameter of the event handler receives the original document without the modifications. 
 We added the optional { new: true }parameter, which will cause our event handler to be
  called with the new modified document instead of the original.
*/
app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedNote) => {
      response.json(updatedNote)
    })
    .catch((error) => next(error))
})

//Unknown endpoint middleware must be the 2nd last loaded middleware, before the error handler.
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
