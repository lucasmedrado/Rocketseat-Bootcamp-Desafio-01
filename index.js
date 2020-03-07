const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
const tasks = [];

server.post('/projects', (req, resp) => {
  const { id, title } = req.body;

  projects.push({id, title, tasks});

  return resp.json(projects);
})

server.listen(3000);