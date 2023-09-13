const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello Phonebook</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const timestamp = new Date().toString()
  const pageContent = `<p>Phonebook has ${persons.length} people</p><p>${timestamp}</p>`

  res.send(pageContent)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const newPerson = req.body
  newPerson.id = Math.floor(Math.random() * 1000000)

  const existingPerson = persons.find(person => person.name === newPerson.name)

  if (!newPerson.name || !newPerson.number) {
    return res.status(400).json({ error: 'Must have name and number' })
  } else if (existingPerson) {
    return res.status(400).json({ error: 'Name must be unique' })
  } else {
    persons = persons.concat(newPerson)
    res.json(newPerson)
  }
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)