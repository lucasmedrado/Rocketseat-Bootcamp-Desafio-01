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

server.post('/projects/:id/tasks', (req, resp) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return resp.json(project);
})

server.get('/projects', (_, resp) => {
  return resp.json(projects);
})

server.put('/projects/:id', (req, resp) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id ==id);

  project.title = title;

  return resp.json(project);
})

server.listen(3000);