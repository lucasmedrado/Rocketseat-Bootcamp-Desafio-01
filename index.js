const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
const tasks = [];

const checkProjectExists = (req, resp, next) => {
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  if(!project){
    return resp.status(400).json({ error: 'Project not found'});
  }

  req.project = project;

  return next();

}

server.post('/projects', (req, resp) => {
  const { id, title } = req.body;

  projects.push({id, title, tasks});

  return resp.json(projects);
})

server.post('/projects/:id/tasks', checkProjectExists, (req, resp) => {  
  const { title } = req.body;
  
  req.project.tasks.push(title);

  return resp.json(req.project);
})

server.get('/projects', (_, resp) => {
  return resp.json(projects);
})

server.put('/projects/:id', checkProjectExists, (req, resp) => {  
  const { title } = req.body;  

  req.project.title = title;

  return resp.json(req.project);
})

server.delete('/projects/:id', checkProjectExists, (req, resp) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(index => index.id == id);

  projects.splice(projectIndex, 1);

  return resp.json(projects);
})

server.listen(3000);