// server.js

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // your MySQL password
  database: 'school' // your database name
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.use(bodyParser.json());

// Create a student
app.post('/students', (req, res) => {
  const { name, email } = req.body;
  const INSERT_STUDENT_QUERY = `INSERT INTO students (name, email) VALUES (?, ?)`;
  connection.query(INSERT_STUDENT_QUERY, [name, email], (err, results) => {
    if (err) throw err;
    res.status(201).send('Student created successfully');
  });
});

// Read all students
app.get('/students', (req, res) => {
  const SELECT_STUDENTS_QUERY = `SELECT * FROM students`;
  connection.query(SELECT_STUDENTS_QUERY, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update a student
app.put('/students/:id', (req, res) => {
  const studentId = req.params.id;
  const { name, email } = req.body;
  const UPDATE_STUDENT_QUERY = `UPDATE students SET name = ?, email = ? WHERE student_id = ?`;
  connection.query(UPDATE_STUDENT_QUERY, [name, email, studentId], (err, results) => {
    if (err) throw err;
    res.send('Student updated successfully');
  });
});

// Delete a student
app.delete('/students/:id', (req, res) => {
  const studentId = req.params.id;
  const DELETE_STUDENT_QUERY = `DELETE FROM students WHERE student_id = ?`;
  connection.query(DELETE_STUDENT_QUERY, [studentId], (err, results) => {
    if (err) throw err;
    res.send('Student deleted successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
