const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('frontend'))

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cica'
})

connection.connect()

app.get('/cica', (req, res) => {
    connection.query('SELECT * from cica ORDER BY nev', (err, rows, fields) => {
      if (err) throw err
      res.send(rows)
    })
  })

app.delete('/cica/:id', (req, res) => {
    const { id } = req.params
    connection.query(`DELETE FROM cica WHERE id = ${id}`, (err, rows, fields) => {
      if (err) throw err
      res.send({ok: rows.affectedRows})
    })
  })

app.post('/post', (req, res) => {
    const { nev } = req.body
    console.log(nev);
    connection.query(`INSERT INTO cica (nev) VALUES ('${nev}')`, (err, rows, fields) => {
      if (err) throw err
      connection.query('SELECT * from cica', (err, rows, fields) => {
        if (err) throw err
        res.send(rows)
      })
    })
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})