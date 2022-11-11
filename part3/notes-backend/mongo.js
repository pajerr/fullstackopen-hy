const mongoose = require('mongoose')
//get password from cli arguments
const password = process.argv[2]

if (process.argv.length < 3) {
    console.log(
        'Please provide the password as an argument: node mongo.js <password>'
    )
    process.exit(1)
}

const url = `mongodb+srv://fullstack:${password}@cluster0.isxty0d.mongodb.net/noteApp?retryWrites=true&w=majority`

//The schema tells Mongoose how the note objects are to be stored in the database.
const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

//Mongoose automatically name collections as the plural (e.g. notes)
const Note = mongoose.model('Note', noteSchema)

mongoose.connect(url).then((result) => {
    console.log('connected')
    Note.find({}).then((result) => {
        result.forEach((note) => {
            console.log(note)
        })
        mongoose.connection.close()
    })
})
/*
Create new note object with help of Note model.
Models are so-called constructor functions that create new JavaScript objects 
based on the provided parameters
        const note = new Note({
            content: 'DevOps is Easy',
            date: new Date(),
            important: true
        })

        return note.save()
    })
    .then(() => {
        console.log('note saved!')
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
*/
