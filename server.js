const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 8000
const app = express()

app.use(bodyParser.json())
app.use(cors())
const Database = {
  users: [
    {
      id: '1',
      name: 'John',
      email: 'John@gmail.com',
      password: 'Cookie',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '2',
      name: 'sally',
      email: 'sally@gmail.com',
      password: 'banana',
      entries: 0,
      joined: new Date(),
    },
  ],
}
app.get('/', (req, res) => {
  res.send(Database.users)
})
app.post('/signin', (req, res) => {
  if (
    req.body.email === Database.users[0].email &&
    req.body.password === Database.users[0].password
  ) {
    res.status(200).json(Database.users[0])
  } else {
    res.status(400).json('error logging')
  }
})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body
  Database.users.push({
    id: '3',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  })
  res.json(Database.users[Database.users.length - 1])
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params
  console.log(id)
  let found = false
  Database.users.forEach((user) => {
    if (user.id == id) {
      found = true
      return res.json(user)
    }
    if (!found) {
      res.status(404).json('No Such user')
    }
  })
})

app.put('/image', (req, res) => {
  const { id } = req.body
  let found = false
  Database.users.forEach((user) => {
    if (user.id == id) {
      found = true
      user.entries++
      return res.json(user.entries)
    }
    if (!found) {
      res.status(404).json('No Such user')
    }
  })
})

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`)
})
