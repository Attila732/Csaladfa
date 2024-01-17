

server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let familyTree = [
  { id: 1, name: 'John Doe', birthDate: '1980-01-01', children: [2, 3] },
  { id: 2, name: 'Jane Doe', birthDate: '1982-02-15', children: [4, 5] },
  { id: 3, name: 'Child 1', birthDate: '2005-03-10', children: [] },
  { id: 4, name: 'Child 2', birthDate: '2008-05-20', children: [] },
  { id: 5, name: 'Child 3', birthDate: '2010-08-12', children: [] },
];

app.get('/api/familyTree', (req, res) => {
  res.json(familyTree);
  
});

app.get('/api/familyTree/:id', (req, res) => {
  const personId = parseInt(req.params.id);
  const person = familyTree.find(p => p.id === personId);

  if (!person) {
    res.status(404).json({ error: 'Person not found' });
    return;
  }

  res.json(person);
});

app.post('/api/familyTree', (req, res) => {
  const newPerson = req.body;
  newPerson.id = familyTree.length + 1;
  familyTree.push(newPerson);
  res.json(newPerson);
});

app.delete('/api/familyTree/:id', (req, res) => {
  const personId = parseInt(req.params.id);
  familyTree = familyTree.filter(p => p.id !== personId);
  res.json({ message: 'Person deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000`);
});
